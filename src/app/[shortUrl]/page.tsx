import Routes from '@lib/constants/routes.constants'
import { analyticsService } from '@lib/services/page'
import { urlService } from '@lib/services/url'
import { html } from 'framer-motion/client'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const RESERVED = Object.values(Routes).map((r) => r.replace(/^\//, ''))

export default async function ShortUrlPage({
  params,
  searchParams,
}: {
  params: Promise<{ shortUrl: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { shortUrl } = await params
  const resolvedSearchParams = await searchParams
  const qr = !!resolvedSearchParams.qr

  if (RESERVED.includes(shortUrl)) {
    return null
  }

  analyticsService.incrementPageClicks()

  const url = await urlService.getUrlByShortUrl(shortUrl)

  if (url) {
    await urlService.updateUrl(url._id.toString(), { clicks: url.clicks + 1 })
  }

  if (!url || !url.status) {
    return redirect(Routes.SHORTENER)
  }

  if (qr) {
    return (
      <html lang="en">
        <body
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90dvh',
            backgroundColor: '#0a0a0a',
          }}
        >
          <main>
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${shortUrl}`}
              alt="QR Code"
              width={350}
              height={350}
            />
          </main>
        </body>
      </html>
    )
  }

  return redirect(url.originalUrl)
}
