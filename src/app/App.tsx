import { RouterProvider } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes';
import { useEffect } from 'react';
import { initializeAnalytics } from './utils/analytics';

export default function App() {
  useEffect(() => {
    // Initialize Firebase Analytics
    initializeAnalytics();
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
