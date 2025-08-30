import { LINK_PREVIEW_API_KEY } from '../constants/config.constants'

type GetPreviewProps = Readonly<{
  urlToPreview: string
}>
export const getPreview = async ({ urlToPreview }: GetPreviewProps) => {
  if (!LINK_PREVIEW_API_KEY) {
    return '/LinkLoom.svg'
  }

  try {
    const domain = new URL(urlToPreview).hostname
    const response = await fetch(`https://api.linkpreview.net/?&q=${domain}`, {
      cache: 'force-cache',
      headers: {
        'X-Linkpreview-Api-Key': LINK_PREVIEW_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch link preview')
    }

    const data = await response.json()

    if (!data || !data.image) {
      return '/LinkLoom.svg'
    }

    return data.image as string
  } catch {
    return '/LinkLoom.svg'
  }
}
