import './globals.css';
import { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'ORION - Financial Dashboard & Market Intelligence',
  description:
    'Real-time financial market data, analytics, and portfolio management platform. Track global indices, stocks, and market trends.',
  keywords: ['finance', 'stocks', 'market data', 'investment', 'portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
