import DashboardChart from '@components/chart/DashboardChart'
import { urlService } from '@lib/services/url'

export default async function DashboardAnalyticsUrls() {
  const weeklyUrlData = await urlService.getLastWeekUrls()

  return (
    <main className="flex mt-5 mb-5 gap-x-5 ">
      <section className="flex flex-col flex-3 gap-y-5">
        <DashboardChart
          title="Urls Created This Week"
          height="h-[730px]"
          data={weeklyUrlData}
          labels={{ label1: 'urls' }}
        />
      </section>
    </main>
  )
}
