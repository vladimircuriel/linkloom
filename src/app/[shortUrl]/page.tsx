import Routes from '@lib/constants/routes.constants'
import { urlService } from '@lib/services/url'
import { redirect } from 'next/navigation'

const RESERVED = Object.values(Routes).map((r) => r.replace(/^\//, ''))

export default async function ShortUrlPage({ params }: { params: Promise<{ shortUrl: string }> }) {
  const { shortUrl } = await params

  if (RESERVED.includes(shortUrl)) {
    return null
  }

  const url = await urlService.getUrlByShortUrl(shortUrl)
  if (!url) {
    return redirect(Routes.SHORTENER)
  }

  return redirect(url.originalUrl)
}
