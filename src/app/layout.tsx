import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Staking Dapp',
  description: 'This is a staking dapp. Built with NextJs and Thirdweb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  )
}
