import Routes from '@lib/constants/routes.constants'
import { analyticsService } from '@lib/services/page'
import { urlService } from '@lib/services/url'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const RESERVED = Object.values(Routes).map((r) => r.replace(/^\//, ''))

export default async function ShortUrlPage({
  params,
  searchParams,
}: {
  params: Promise<{ shortUrl: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { shortUrl } = await params
  const resolvedSearchParams = await searchParams
  const qr = resolvedSearchParams.qr

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
      <Image
        src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${shortUrl}`}
        alt="QR Code"
        width={350}
        height={350}
      />
    )
  }

  return redirect(url.originalUrl)
}
