import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lionel Nando - Web Developer & Digital Specialist',
  description: 'Portofolio Lionel Nando. Solusi web kreatif dan pengembangan digital.',
};

// Warna dari logo untuk gradasi background
const backgroundColors = {
  darkBase: '#1A1A1A',
  accentTeal: '#45bfb4', // Warna dasar dari logo
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={inter.className}
        style={{
          // Gradasi radial untuk background yang lebih elegan
          background: `radial-gradient(circle at 70% 30%, ${backgroundColors.accentTeal} -80%, ${backgroundColors.darkBase} 40%)`,
          color: '#E0E0E0',
          margin: 0,
          padding: 0,
          overflowX: 'hidden', // Mencegah scroll horizontal
        }}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}