import './globals.css'
import { Spectral } from 'next/font/google'
import { Metadata } from 'next'

const spectral = Spectral({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-spectral',
})

export const metadata: Metadata = {
  title: 'Ellington Hart Capital - Venture Capital for Daring Founders',
  description: 'We help daring founders build legendary companies from seed to IPO.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spectral.variable}>
      <body className="font-spectral">{children}</body>
    </html>
  )
}
