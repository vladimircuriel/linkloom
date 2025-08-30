'use server'

import Routes from '@lib/constants/routes.constants'
import authService from '@lib/services/auth/auth.service'
import { userService } from '@lib/services/user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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

const formSchema = z
  .object({
    name: z.string().trim().min(1),
    email: z.email().transform((v) => v.trim().toLowerCase()),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const createUser = async (_prev: unknown, formData: FormData) => {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  }

  const parsed = formSchema.safeParse(raw)
  if (!parsed.success) return { error: 'Invalid data' }
  const { name, email, password } = parsed.data

  const username = `${email.split('@')[0]}${Math.floor(Math.random() * 10000)}`.toLowerCase()

  try {
    const exists = await userService.getUserByEmail(email)
    if (exists) return { error: 'User already exists' }

    const hashedPassword = await authService.hashPassword({ password })

    await userService.createUser({
      name,
      email,
      username,
      password: hashedPassword,
    })

    const user = await userService.getUserByEmail(email)
    if (!user) throw new Error('User creation failed')
  } catch (err) {
    throw new Error(`Registration failed: ${err}`)
  }

  redirect(`${Routes.DASHBOARD}/users`)
}

const editFormSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id'),
  name: z.string().min(1).optional(),
  email: z.email().optional(),
  username: z.string().min(1).optional(),
  isAdmin: z.coerce.boolean().optional(),
})

export const editUser = async (_prev: unknown, formData: FormData) => {
  const raw = Object.fromEntries(formData.entries())
  const parsed = editFormSchema.safeParse(raw)
  if (!parsed.success) return { error: 'Invalid data' }

  try {
    const { userId, ...rest } = parsed.data
    const updated = await userService.updateUser(userId, rest)
    if (!updated) return { error: 'User not found' }
  } catch (err) {
    throw new Error(`Update user failed: ${err}`)
  }

  redirect(`${Routes.DASHBOARD}/users`)
}
