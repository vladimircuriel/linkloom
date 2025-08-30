import { z } from 'zod'

export class ValidationError extends Error {
  constructor(public readonly tree: ReturnType<typeof z.treeifyError>) {
    super('Invalid data')
  }
}

export function assertValid<S extends z.ZodTypeAny>(schema: S, data: unknown): z.infer<S> {
  const parsed = schema.safeParse(data)
  if (parsed.success) return parsed.data
  throw new ValidationError(z.treeifyError(parsed.error))
}
