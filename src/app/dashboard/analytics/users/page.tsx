import DashboardChart from '@components/chart/DashboardChart'
import { userService } from '@lib/services/user'

export default async function DashboardAnalyticsUsers() {
  const weeklyUrlData = await userService.getLastWeekUsers()

  return (
    <main className="flex gap-x-5 ">
      <section className="flex flex-col flex-3 gap-y-5">
        <DashboardChart
          title="User Registered This Week"
          height="h-[750px]"
          data={weeklyUrlData}
          labels={{ label1: 'users' }}
        />
      </section>
    </main>
  )
}
