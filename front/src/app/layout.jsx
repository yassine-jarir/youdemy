import * as React from 'react';

import '@/styles/global.css';

import { AuthProvider } from '@/contexts/AuthContexts';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 };

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
