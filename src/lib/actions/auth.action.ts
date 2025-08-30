'use server'

import auth from '@lib/auth/auth'
import Routes from '@lib/constants/routes.constants'
import { emailValidationSchema } from '@lib/models/user/user.schema'
import authService from '@lib/services/auth/auth.service'
import { userService } from '@lib/services/user/index'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const login = async (_prev: unknown, formData: FormData) => {
  const rawEmail = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const parsed = emailValidationSchema.safeParse({ email: rawEmail })
  if (!parsed.success || !password) return { error: 'Email and password are required' }
  const email = parsed.data.email

  try {
    const user = await userService.getUserByEmail(email)
    if (!user || !user.password) return { error: 'Invalid credentials' }

    const ok = await authService.comparePassword({
      password,
      hashedPassword: user.password,
    })
    if (!ok) return { error: 'Invalid credentials' }

    await auth.createSession({
      sub: String(user._id),
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (error) {
    throw new Error(`An error occurred during login: ${error}`)
  }
  redirect(Routes.SHORTENER)
}

export const logout = async () => {
  await auth.deleteSession()
  revalidatePath('/')
  redirect(Routes.HOME)
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

export const register = async (_prev: unknown, formData: FormData) => {
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
    await auth.createSession({
      sub: String(user._id),
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (err) {
    throw new Error(`Registration failed: ${err}`)
  }
  redirect(Routes.SHORTENER)
}
