import connectToDatabase from '@lib/utils/db'
import to from '@lib/utils/to'
import type { Model } from 'mongoose'

type QueryUrlsResult<T> = { urlsAmount: number; urls: T[] }
type WeekPoint = { name: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'; n1: number }

export class UrlService<
  T extends {
    _id: unknown
    shortUrl: string
    originalUrl: string
    user: unknown
    createdAt?: Date
  },
> {
  constructor(private readonly Url: Model<T>) {}

  async getUrls(q: string, page: number, perPage = 5): Promise<QueryUrlsResult<T>> {
    await connectToDatabase()
    const regex = new RegExp(q, 'i')

    const [urls, err] = await to(
      this.Url.find({ $or: [{ shortUrl: { $regex: regex } }, { originalUrl: { $regex: regex } }] })
        .sort({ createdAt: -1 })
        .limit(perPage)
        .skip(perPage * Math.max(page - 1, 0))
        .lean<T[]>(),
    )
    if (err) throw new Error(`Error fetching urls: ${err}`)

    const [urlsAmount, cntErr] = await to(
      this.Url.find({
        $or: [{ shortUrl: { $regex: regex } }, { originalUrl: { $regex: regex } }],
      }).countDocuments(),
    )
    if (cntErr) throw new Error(`Error counting urls: ${cntErr}`)

    return { urlsAmount, urls: urls ?? [] }
  }

  async getAmountOfUrls(): Promise<number> {
    await connectToDatabase()
    const [amount, err] = await to(this.Url.countDocuments())
    if (err) throw new Error(`Error fetching amount of urls: ${err}`)
    return amount ?? 0
  }

  async getLastNUrls(n: number): Promise<T[]> {
    await connectToDatabase()
    const [urls, err] = await to(this.Url.find().sort({ createdAt: -1 }).limit(n).lean<T[]>())
    if (err) throw new Error(`Error fetching last N urls: ${err}`)
    return urls ?? []
  }

  async getWeeklyUrlGrowth(): Promise<number> {
    await connectToDatabase()
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const [thisWeek, e1] = await to(this.Url.find({ createdAt: { $gte: oneWeekAgo } }))
    if (e1) throw new Error(`Error fetching urls this week: ${e1}`)

    const [lastWeek, e2] = await to(
      this.Url.find({ createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo } }),
    )
    if (e2) throw new Error(`Error fetching urls last week: ${e2}`)

    if (!lastWeek || lastWeek.length === 0) return (thisWeek?.length ?? 0) > 0 ? 100 : 0
    return Math.floor((((thisWeek?.length ?? 0) - lastWeek.length) / lastWeek.length) * 100)
  }

  async getAverageUrlsPerUser(): Promise<number> {
    await connectToDatabase()
    const [result, err] = await to<any[]>(
      this.Url.aggregate([
        { $group: { _id: '$user', urlCount: { $sum: 1 } } },
        { $group: { _id: null, averageUrls: { $avg: '$urlCount' } } },
      ]) as any,
    )
    if (err) throw new Error(`Error computing average urls per user: ${err}`)
    return Math.floor(result?.[0]?.averageUrls ?? 0)
  }

  async getWeeklyAverageUrlsPerUserGrowth(): Promise<number> {
    await connectToDatabase()
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const resultThisWeek = await this.Url.aggregate([
      { $match: { createdAt: { $gte: oneWeekAgo } } },
      { $group: { _id: '$user', urlCount: { $sum: 1 } } },
      { $group: { _id: null, averageUrls: { $avg: '$urlCount' } } },
    ])

    const resultLastWeek = await this.Url.aggregate([
      { $match: { createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo } } },
      { $group: { _id: '$user', urlCount: { $sum: 1 } } },
      { $group: { _id: null, averageUrls: { $avg: '$urlCount' } } },
    ])

    const avgThis = resultThisWeek[0]?.averageUrls ?? 0
    const avgLast = resultLastWeek[0]?.averageUrls ?? 0
    if (avgLast === 0) return avgThis > 0 ? 100 : 0
    return Math.floor(((avgThis - avgLast) / avgLast) * 100)
  }

  async getUrlById(id: string): Promise<T | null> {
    await connectToDatabase()
    const [url, err] = await to(this.Url.findById(id).lean<T | null>())
    if (err) throw new Error(`Error fetching url by ID: ${err}`)
    return url ?? null
  }

  async getUrlByUserId(userId: string, reverse = false): Promise<T[]> {
    await connectToDatabase()
    const [urls, err] = await to(
      this.Url.find({ user: userId })
        .sort({ _id: reverse ? -1 : 1 })
        .lean<T[]>(),
    )
    if (err) throw new Error(`Error fetching urls by user: ${err}`)
    return urls ?? []
  }

  async getUrlByShortUrl(shortUrl: string): Promise<T | null> {
    await connectToDatabase()
    const [url, err] = await to(this.Url.findOne({ shortUrl }).lean<T | null>())
    if (err) throw new Error(`Error fetching url by shortUrl: ${err}`)
    return url ?? null
  }

  async getLastWeekUrls(): Promise<WeekPoint[]> {
    await connectToDatabase()
    const days: WeekPoint['name'][] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data: WeekPoint[] = []

    for (const day of days) {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      start.setDate(start.getDate() - ((start.getDay() + 7 - days.indexOf(day)) % 7))

      const end = new Date(start)
      end.setDate(start.getDate() + 1)

      const count = await this.Url.find({ createdAt: { $gte: start, $lt: end } }).countDocuments()
      data.push({ name: day, n1: count })
    }

    return data
  }

  // Siempre requiere usuario
  async createUrl(input: { originalUrl: string; shortUrl: string; userId: string }): Promise<T> {
    await connectToDatabase()
    const [created, err] = await to(
      this.Url.create({
        originalUrl: input.originalUrl,
        shortUrl: input.shortUrl,
        user: input.userId,
      } as T),
    )
    if (err) throw new Error(`Error creating url: ${err}`)
    return created
  }

  async updateUrl(id: string, patch: Partial<T>): Promise<T | null> {
    await connectToDatabase()
    const [updated, err] = await to(
      this.Url.findByIdAndUpdate(id, patch, { new: true }).lean<T | null>(),
    )
    if (err) throw new Error(`Error updating url: ${err}`)
    return updated ?? null
  }

  async deleteUrl(id: string): Promise<T | null> {
    await connectToDatabase()
    const [deleted, err] = await to(this.Url.findByIdAndDelete(id).lean<T | null>())
    if (err) throw new Error(`Error deleting url: ${err}`)
    return deleted ?? null
  }
}
