import DashboardCard from '@components/card/DashboardCard'
import { urlService } from '@/src/lib/services/url'
import { userService } from '@/src/lib/services/user'

export default async function DashboardPage() {
  const amountOfUsers = await userService.getAmountOfUsers()
  const weeklyUserGrowth = await userService.getWeeklyUserGrowth()
  const amountOfUrls = await urlService.getAmountOfUrls()
  const weeklyUrlGrowth = await urlService.getWeeklyUrlGrowth()
  const averageUrlsPerUser = await urlService.getAverageUrlsPerUser()
  const weeklyAverageUrlsPerUserGrowth = await urlService.getWeeklyAverageUrlsPerUserGrowth()

  return (
    <section className="flex mt-5 mb-5 gap-x-5">
      <div className="flex flex-col flex-3 gap-y-5">
        <div className="flex justify-between gap-x-5">
          <DashboardCard
            title="Total of users"
            amount={amountOfUsers}
            percentage={weeklyUserGrowth}
          />
          <DashboardCard title="Total of urls" amount={amountOfUrls} percentage={weeklyUrlGrowth} />
          <DashboardCard
            title="Average of url per user"
            amount={averageUrlsPerUser}
            percentage={weeklyAverageUrlsPerUserGrowth}
          />
        </div>
        {/* <DashboardTransaction urls={last5Urls} /> */}
        {/* <DashboardChart data={data} labels={{ label1: 'visits', label2: 'clicks' }} /> */}
      </div>
    </section>
  )
}
