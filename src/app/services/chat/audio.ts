export const playIncomingRingtone = () => {
  const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) {
    return () => undefined;
  }

  const context = new AudioContextClass();
  let cancelled = false;

  const ring = () => {
    if (cancelled) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);

    window.setTimeout(ring, 1200);
  };

  void context.resume().then(ring).catch(() => undefined);

  return () => {
    cancelled = true;
    void context.close().catch(() => undefined);
  };
};
