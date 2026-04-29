import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
  const accessToken = useSelector((state: any) => state.auth.adminAccessToken);
  if (!accessToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};
