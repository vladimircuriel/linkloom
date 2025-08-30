import UrlForms from '@components/forms/UrlForm'
import TableSkelton from '@components/skeleton/TableSkeleton'
import UrlsTable from '@components/table/UrlsTable'
import auth from '@lib/auth/auth'
import Routes from '@lib/constants/routes.constants'
import { analyticsService } from '@lib/services/page'
import { urlService } from '@lib/services/url'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

// const getUrl = async () => {
//   const session = await auth();
//   const user = session?.user;
//   const reverse = true;
//   if (user && user.id) return await getUrlByUserId(user.id, reverse);
// };
const REVERSE = true

export default async function ShortenerPage() {
  const userPayload = await auth.getAuthPayload()
  if (!userPayload?.sub) return redirect(Routes.HOME)
  analyticsService.incrementPageVisits()

  const urls = await urlService.getUrlByUserId(userPayload.sub, REVERSE)

  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <h2 className="sr-only">All your shorten urls</h2>
        <UrlForms />
        <Suspense fallback={<TableSkelton />}>
          <UrlsTable urls={urls} />
        </Suspense>
      </div>
    </section>
  )
}
