'use server'

import auth from '@lib/auth/auth'
import { urlService } from '@lib/services/url/index'
import makeShortUrl from '@lib/utils/url'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// --- Schemas ---
const createSchema = z.object({
  originalUrl: z.string().trim().min(1),
})

const idSchema = z.object({
  urlId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id'),
})

export const createShortUrl = async (_prev: unknown, formData: FormData) => {
  const parsed = createSchema.safeParse({
    originalUrl: String(formData.get('originalUrl') ?? ''),
  })
  if (!parsed.success) return { error: 'URL is required' }

  const payload = await auth.getAuthPayload()
  const userId = payload?.sub
  if (!userId) return { error: 'You must be logged in to create a short URL' }

  try {
    const u = new URL(parsed.data.originalUrl)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return { error: 'Invalid URL' }
  } catch {
    return { error: 'Invalid URL' }
  }

  try {
    const shortUrl = makeShortUrl()
    await urlService.createUrl({ originalUrl: parsed.data.originalUrl, shortUrl, userId })
    revalidatePath('/shortener')
    return { success: true }
  } catch (err) {
    throw new Error(`Create short URL failed: ${err}`)
  }
}

export const changeUrlStatus = async (_prev: unknown, formData: FormData) => {
  const parsed = idSchema.safeParse({
    urlId: String(formData.get('urlId') ?? ''),
  })
  if (!parsed.success) return { error: 'ID is required' }

  try {
    const url = await urlService.getUrlById(parsed.data.urlId)
    if (!url) return { error: 'URL not found' }

    await urlService.updateUrl(parsed.data.urlId, { status: !(url as any).status } as any)
    revalidatePath('/shortener')
    return { success: true }
  } catch (err) {
    throw new Error(`Toggle URL status failed: ${err}`)
  }
}
