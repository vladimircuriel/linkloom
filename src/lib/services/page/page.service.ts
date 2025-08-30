import connectToDatabase from '@lib/utils/db'
import to from '@lib/utils/to'
import type { Model } from 'mongoose'

type WeekPoint = {
  name: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
  n1: number
  n2: number
}

export class AnalyticsService<
  C extends { _id: unknown; createdAt?: Date; clicks?: number },
  V extends { _id: unknown; createdAt?: Date; visits?: number },
> {
  constructor(
    private readonly Click: Model<C>,
    private readonly Visit: Model<V>,
  ) {}

  async incrementPageClicks() {
    await connectToDatabase()
    const [doc, err] = await to(this.Click.create({ clicks: 1 } as any))
    if (err) throw new Error(`Error incrementing clicks: ${err}`)
    return doc
  }

  async incrementPageVisits() {
    await connectToDatabase()
    const [doc, err] = await to(this.Visit.create({ visits: 1 } as any))
    if (err) throw new Error(`Error incrementing visits: ${err}`)
    return doc
  }

  async getWeeklyData(): Promise<WeekPoint[]> {
    await connectToDatabase()

    const days: WeekPoint['name'][] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const data: WeekPoint[] = []

    for (const day of days) {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      start.setDate(start.getDate() - ((start.getDay() + 7 - days.indexOf(day)) % 7))

      const end = new Date(start)
      end.setDate(start.getDate() + 1)

      const [visits, vErr] = await to(
        this.Visit.find({ createdAt: { $gte: start, $lt: end } }).countDocuments(),
      )
      if (vErr) throw new Error(`Error counting visits: ${vErr}`)

      const [clicks, cErr] = await to(
        this.Click.find({ createdAt: { $gte: start, $lt: end } }).countDocuments(),
      )
      if (cErr) throw new Error(`Error counting clicks: ${cErr}`)

      data.push({ name: day, n1: visits ?? 0, n2: clicks ?? 0 })
    }

    return data
  }
}
