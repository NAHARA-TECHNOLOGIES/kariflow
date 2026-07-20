import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './ClientLayout';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kariflow | Modern Fashion Tech Solutions',
  description: 'The all-in-one platform for fashion designers and brands. Build. Manage. Scale your workshop.',
  openGraph: {
    title: 'Kariflow | Modern Fashion Tech Solutions',
    description: "Digitizing the tailor's intuition for the next generation of fashion icons.",
    images: ['https://kariflow.app/og-default.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 🎯 FIXED: Added suppressHydrationWarning to handle browser extensions injection (like data-qb-installed)
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}