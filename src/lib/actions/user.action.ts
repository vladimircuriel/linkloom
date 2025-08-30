'use server'

import Routes from '@lib/constants/routes.constants'
import { userService } from '@lib/services/user'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id'),
})

export const deleteUser = async (_prev: unknown, formData: FormData) => {
  const parsed = schema.safeParse({ userId: String(formData.get('userId') ?? '') })
  if (!parsed.success) return { error: 'Invalid data' }

  try {
    const deleted = await userService.deleteUser(parsed.data.userId)
    if (!deleted) return { error: 'User not found' }
    revalidatePath(`${Routes.DASHBOARD}/users`)
    return { success: true }
  } catch (err) {
    throw new Error(`Delete user failed: ${err}`)
  }
}
