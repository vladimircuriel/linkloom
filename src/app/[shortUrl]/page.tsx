import Routes from '@lib/constants/routes.constants'
import { analyticsService } from '@lib/services/page'
import { urlService } from '@lib/services/url'
import { redirect } from 'next/navigation'

const RESERVED = Object.values(Routes).map((r) => r.replace(/^\//, ''))

export default async function ShortUrlPage({ params }: { params: Promise<{ shortUrl: string }> }) {
  const { shortUrl } = await params

  if (RESERVED.includes(shortUrl)) {
    return null
  }

  analyticsService.incrementPageClicks()

  const url = await urlService.getUrlByShortUrl(shortUrl)

  if (url) {
    await urlService.updateUrl(url._id.toString(), { clicks: url.clicks + 1 })
  }
  if (!url) {
    return redirect(Routes.SHORTENER)
  }

  return redirect(url.originalUrl)
}
