import Background from '@components/background/Background'
import Footer from '@components/navigation/footer/Footer'
import DashboardSidebar from '@components/navigation/sidebar/DashboardSidebar'
import auth from '@lib/auth/auth'
import { startup } from '@lib/bootstrap'
import { userService } from '@lib/services/user'
import type { Metadata } from 'next'
import { Onest } from 'next/font/google'

import '../globals.css'
import { redirect } from 'next/navigation'
import Routes from '@/src/lib/constants/routes.constants'

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-onest',
})

export const metadata: Metadata = {
  title: 'LinkLoom | Dashboard',
  description: 'LinkLoom is a URL shortener with QR integration, statistics in a modern UI.',
}

await startup()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userPayload = await auth.getAuthPayload()
  if (!userPayload?.sub) redirect(Routes.HOME)

  const user = userPayload ? await userService.getUserById(userPayload.sub) : null
  if (!user) redirect(Routes.HOME)

  const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <html lang="en">
      <body
        className={`${onest.variable} antialiased relative flex flex-col min-h-screen bg-[#0B101B] text-center overflow-x-hidden text-white p-3`}
      >
        <Background />

        <div className="flex items-start justify-center py-4">
          <div className="sticky top-0 flex flex-1 min-h-screen">
            <DashboardSidebar user={plainUser} />
          </div>

          <div className="sticky top-0 flex flex-col p-5 pt-0 flex-4">
            <main>{children}</main>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  )
}
