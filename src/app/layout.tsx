// src/app/layout.tsx

import "./globals.css";
import { ThemeProvider } from './contexts/ThemeContext';  // Import the ThemeProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
