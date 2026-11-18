import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://purplelineco.com'),
  title: 'Purple Line Consent · Coming soon from Purple Line Co.',
  description:
    'Tattoo consent forms on a dedicated iPad at your front desk. No client phones, no QR codes, and it keeps working without Wi-Fi.',
  openGraph: {
    title: 'Introducing Purple Line Consent',
    description:
      'Tattoo consent forms on a dedicated iPad at your front desk. No client phones, no QR codes, works without Wi-Fi.',
    url: 'https://purplelineco.com',
    siteName: 'Purple Line Co.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#5a2ca0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
