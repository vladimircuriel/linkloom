import { z } from 'zod'

const objectId = z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid ObjectId' })

export const userBaseSchema = z
  .object({
    _id: objectId.optional(),
    email: z.email().transform((v) => v.trim().toLowerCase()),
    username: z
      .string()
      .trim()
      .min(3)
      .max(32)
      .regex(/^[a-z0-9._-]+$/i, { message: 'Invalid username' }),
    name: z.string().trim().min(1).max(120),
    password: z.string().min(8).max(128),
    img: z.url().optional(),
    isAdmin: z.boolean().default(false).optional(),
  })
  .strict()

export const userCreateSchema = userBaseSchema
export const userUpdateSchema = userBaseSchema.partial()

export const idValidationSchema = z.object({ _id: objectId })
export const emailValidationSchema = z.object({
  email: z.email().transform((v) => v.trim().toLowerCase()),
})

export const userSessionSchema = z.object({
  _id: objectId,
  name: z.string(),
  email: z.email(),
  isAdmin: z.boolean().optional(),
})
