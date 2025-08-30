import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@lib/constants/config.constants'
import {
  emailValidationSchema,
  idValidationSchema,
  userCreateSchema,
  userUpdateSchema,
} from '@lib/models/user/user.schema'
import authService from '@lib/services/auth/auth.service'
import connectToDatabase from '@lib/utils/db'
import to from '@lib/utils/to'
import type { Model } from 'mongoose'

type QueryUsersResult<T> = { usersAmount: number; users: T[] }
type WeekPoint = { name: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'; n1: number }

export class UserService<
  T extends {
    _id: unknown
    createdAt?: Date
    name?: string
    email?: string
    username?: string
    password?: string
  },
> {
  constructor(private readonly User: Model<T>) {}

  async ensureDefaultAdmin(opts?: {
    email?: string
    username?: string
    name?: string
    password?: string
  }): Promise<T> {
    const email = opts?.email ?? ADMIN_EMAIL
    const username = opts?.username ?? 'admin'
    const name = opts?.name ?? 'Administrator'
    const rawPassword = opts?.password ?? ADMIN_PASSWORD

    if (!email || !rawPassword) {
      throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD')
    }

    const existing = await this.User.findOne({ email }).lean<T | null>()
    if (existing) return existing as T

    const hashed = await authService.hashPassword({ password: rawPassword })
    const doc = await this.User.create({
      email,
      username,
      name,
      password: hashed,
      isAdmin: true,
    } as unknown as T)

    return doc
  }

  async getUsers({
    q,
    page,
    perPage = 5,
  }: {
    q: string
    page: number
    perPage: number
  }): Promise<QueryUsersResult<T>> {
    await connectToDatabase()

    const regex = new RegExp(q, 'i')
    const [users, error] = await to(
      this.User.find({ $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }] })
        .sort({ createdAt: -1 })
        .limit(perPage)
        .skip(perPage * Math.max(page - 1, 0))
        .lean<T[]>(),
    )
    if (error) throw new Error(`Error fetching users: ${error}`)

    const [usersAmount, amountError] = await to(
      this.User.find({
        $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
      }).countDocuments(),
    )
    if (amountError) throw new Error(`Error counting users: ${amountError}`)

    return { usersAmount, users: users ?? [] }
  }

  async getAmountOfUsers(): Promise<number> {
    await connectToDatabase()
    const [amount, error] = await to(this.User.countDocuments())
    if (error) throw new Error(`Error fetching amount of users: ${error}`)
    return amount ?? 0
  }

  async getLastWeekUsers(): Promise<WeekPoint[]> {
    await connectToDatabase()

    const days: WeekPoint['name'][] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data: WeekPoint[] = []

    for (const day of days) {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      start.setDate(start.getDate() - ((start.getDay() + 7 - days.indexOf(day)) % 7))

      const end = new Date(start)
      end.setDate(start.getDate() + 1)

      const count = await this.User.find({ createdAt: { $gte: start, $lt: end } }).countDocuments()
      data.push({ name: day, n1: count })
    }

    return data
  }

  async getWeeklyUserGrowth(): Promise<number> {
    await connectToDatabase()

    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const [thisWeek, errThis] = await to(this.User.find({ createdAt: { $gte: oneWeekAgo } }))
    if (errThis) throw new Error(`Error fetching users this week: ${errThis}`)

    const [lastWeek, errLast] = await to(
      this.User.find({ createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo } }),
    )
    if (errLast) throw new Error(`Error fetching users last week: ${errLast}`)

    if (!lastWeek || lastWeek.length === 0) return (thisWeek?.length ?? 0) > 0 ? 100 : 0
    return (((thisWeek?.length ?? 0) - lastWeek.length) / lastWeek.length) * 100
  }

  async getUserById(id: string): Promise<T | null> {
    const res = idValidationSchema.safeParse({ _id: String(id) })
    if (!res.success) throw new Error('Invalid id')

    await connectToDatabase()
    const [user, error] = await to(this.User.findById(id).lean<T | null>())
    if (error) throw new Error(`Error fetching user by ID: ${error}`)
    return user ?? null
  }

  async getUserByEmail(email: string): Promise<T | null> {
    const parsed = emailValidationSchema.safeParse({ email })
    if (!parsed.success) throw new Error('Invalid email')
    const normalizedEmail = parsed.data.email

    await connectToDatabase()
    const [user, error] = await to(this.User.findOne({ email: normalizedEmail }).lean<T | null>())
    if (error) throw new Error(`Error fetching user by email: ${error}`)
    return user ?? null
  }

  async getUserByUsername(username: string): Promise<T | null> {
    await connectToDatabase()
    const [user, error] = await to(this.User.findOne({ username }).lean<T | null>())
    if (error) throw new Error(`Error fetching user by username: ${error}`)
    return user ?? null
  }

  async createUser(user: unknown): Promise<T> {
    const parsed = userCreateSchema.safeParse(user)
    if (!parsed.success) throw new Error('Invalid user payload')

    await connectToDatabase()
    const [doc, error] = await to(this.User.create(parsed.data as T))
    if (error) throw new Error(`Error creating user: ${error}`)
    return doc
  }

  async updateUser(id: string, user: unknown): Promise<T | null> {
    const idOk = idValidationSchema.safeParse({ _id: id })
    if (!idOk.success) throw new Error('Invalid id')

    const payload = userUpdateSchema.safeParse(user)
    if (!payload.success) throw new Error('Invalid user payload')

    await connectToDatabase()
    const [updated, error] = await to(
      this.User.findByIdAndUpdate(id, payload.data as Partial<T>, { new: true }).lean<T | null>(),
    )
    if (error) throw new Error(`Error updating user: ${error}`)
    return updated ?? null
  }

  async deleteUser(id: string): Promise<T | null> {
    const res = idValidationSchema.safeParse({ _id: id })
    if (!res.success) throw new Error('Invalid id')

    await connectToDatabase()
    const [deleted, error] = await to(this.User.findByIdAndDelete(id).lean<T | null>())
    if (error) throw new Error(`Error deleting user: ${error}`)
    return deleted ?? null
  }
}
