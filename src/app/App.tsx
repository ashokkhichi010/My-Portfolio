import { RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes';
import { useEffect } from 'react';
import { initializeAnalytics } from './utils/analytics';
import { useDispatch } from 'react-redux';
import { rehydrationComplete } from './redux/slices';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Firebase Analytics
    initializeAnalytics();
    dispatch(rehydrationComplete());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
