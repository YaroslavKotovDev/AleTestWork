// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Assignment Submission Portal',
  description: 'A portal to submit assignments.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
    {children}
    </body>
    </html>
  );
}
