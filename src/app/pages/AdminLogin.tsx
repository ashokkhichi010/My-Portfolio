import { useState } from 'react';
import type { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { LockKeyhole, ShieldEllipsis } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { authApi } from '../services/api';
import {
  resetAdminLoginFlow,
  setAdminSession,
  setAuthError,
  setAuthLoading,
  setOtpChallenge,
} from '../redux/slices';

export const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  if (auth.adminAccessToken) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const submitCredentials = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    try {
      const response = await authApi.adminLogin(email, password);
      dispatch(setOtpChallenge(response));
    } catch (error: any) {
      dispatch(setAuthLoading(false));
      dispatch(setAuthError(error.message));
    }
  };

  const submitOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    try {
      const response = await authApi.adminVerifyOtp(auth.otpToken, otp);
      dispatch(setAdminSession(response));
      navigate('/admin-dashboard', { replace: true });
    } catch (error: any) {
      dispatch(setAuthLoading(false));
      dispatch(setAuthError(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(114,230,255,0.16),_transparent_24%),linear-gradient(180deg,_#040816_0%,_#02040a_100%)] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-cyan-300/15 bg-white/[0.04] p-8 shadow-[0_40px_140px_rgba(0,0,0,0.48)] backdrop-blur-xl md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-100">
              <ShieldEllipsis size={15} />
              Admin Access
            </div>
            <div>
              <h1 className="font-system-display text-4xl tracking-tight text-white md:text-5xl">
                Secure live takeover console
              </h1>
              <p className="mt-4 max-w-xl text-sm text-white/65 md:text-base">
                Authenticate with your admin credentials, confirm the one-time code from email, then take over verified
                visitor conversations in realtime.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard label="Step 1" value="Email + password validation" />
              <InfoCard label="Step 2" value="6-digit OTP over SMTP email" />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/25 p-6">
            {auth.loginStep === 'otp' ? (
              <form className="space-y-6" onSubmit={submitOtp}>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">Two-factor verification</p>
                  <h2 className="mt-3 text-2xl text-white">Enter your 6-digit code</h2>
                  <p className="mt-3 text-sm text-white/58">
                    OTP expires at {auth.otpExpiresAt ? new Date(auth.otpExpiresAt).toLocaleTimeString() : 'soon'}.
                  </p>
                </div>

                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {auth.error ? <ErrorText message={auth.error} /> : null}

                <button
                  type="submit"
                  disabled={auth.isLoading || otp.length !== 6}
                  className="w-full rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {auth.isLoading ? 'Verifying...' : 'Verify and enter dashboard'}
                </button>

                <button
                  type="button"
                  onClick={() => dispatch(resetAdminLoginFlow())}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72"
                >
                  Back to credentials
                </button>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={submitCredentials}>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">Admin sign-in</p>
                  <h2 className="mt-3 text-2xl text-white">Enter credentials</h2>
                </div>

                <label className="block space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/48">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
                    placeholder="admin@example.com"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/48">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
                    placeholder="••••••••"
                  />
                </label>

                {auth.error ? <ErrorText message={auth.error} /> : null}

                <button
                  type="submit"
                  disabled={auth.isLoading || !email.trim() || !password.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-medium text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LockKeyhole size={16} />
                  {auth.isLoading ? 'Sending OTP...' : 'Continue to OTP'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
    <p className="mt-3 text-sm text-white/78">{value}</p>
  </div>
);

const ErrorText = ({ message }: { message: string }) => (
  <p className="rounded-2xl bg-rose-400/10 px-4 py-3 text-sm text-rose-100">{message}</p>
);
