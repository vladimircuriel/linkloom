import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import '../globals.css'
import Background from '@components/background/Background'
import Footer from '@components/navigation/footer/Footer'
import Navbar from '@components/navigation/navbar/Navbar'
import auth from '@lib/auth/auth'
import { startup } from '@lib/bootstrap'

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-onest',
})

export const metadata: Metadata = {
  title: 'LinkLoom',
  description: 'LinkLoom is a URL shortener with QR integration, statistics in a modern UI.',
}

await startup()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userPayload = await auth.getAuthPayload()

  return (
    <html lang="en">
      <body
        className={`${onest.variable} antialiased flex flex-col min-h-screen bg-[#0B101B] text-center text-white p-3`}
      >
        <Background />

        <header>
          <Navbar authenticated={!!userPayload} adminPermissions={userPayload?.isAdmin ?? false} />
        </header>
        
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  )
}
