import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'LinkLoom',
  description: 'LinkLoom is a URL shortener with QR integration, statistics in a modern UI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center min-h-screen min-w-screen bg-black">
        <main>{children}</main>
      </body>
    </html>
  )
}
