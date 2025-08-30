import DashboardChart from '@components/chart/DashboardChart'
import { urlService } from '@lib/services/url'

export default async function DashboardAnalyticsUrls() {
  const weeklyUrlData = await urlService.getLastWeekUrls()

  return (
    <main className="flex gap-x-5 ">
      <section className="flex flex-col flex-3 gap-y-5">
        <DashboardChart
          title="Urls Created This Week"
          height="h-[750px]"
          data={weeklyUrlData}
          labels={{ label1: 'urls' }}
        />
      </section>
    </main>
  )
}
