import ApplySearchButton from '@components/buttons/ApplySearchButton'
import UrlForms from '@components/forms/UrlForm'
import InputStatusSelect from '@components/inputs/InputStatusSelect'
import SearchInput from '@components/inputs/SearchInput'
import Pagination from '@components/pagination/Pagination'
import TableSkelton from '@components/skeleton/TableSkeleton'
import UrlsTable from '@components/table/UrlsTable'
import auth from '@lib/auth/auth'
import Routes from '@lib/constants/routes.constants'
import { analyticsService } from '@lib/services/page'
import { urlService } from '@lib/services/url'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

const REVERSE = true
const PER_PAGE = 10

export default async function ShortenerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const userPayload = await auth.getAuthPayload()
  if (!userPayload?.sub) return redirect(Routes.HOME)
  analyticsService.incrementPageVisits()

  const resolvedSearchParams = await searchParams
  const q = resolvedSearchParams.q as string | undefined
  const page = resolvedSearchParams.page as string | undefined
  const s = resolvedSearchParams.s as string | undefined

  if (q && !q.trim()) {
    return redirect(Routes.SHORTENER)
  }

  const { urls, total } = await urlService.getUrlByUserId({
    userId: userPayload.sub,
    limit: PER_PAGE,
    reverse: REVERSE,
    page: page ? parseInt(page, 10) || 1 : 1,
    status: s === 'active' ? true : s === 'disabled' ? false : undefined,
    search: q,
  })

  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="sr-only">All your shorten urls</h2>
        <UrlForms />

        <div className="hidden md:flex items-center justify-between w-full px-2 mb-4">
          <SearchInput placeholder="Search your links..." originalDesign={false} />
          <div className="flex items-center gap-x-2">
            <InputStatusSelect />
            <ApplySearchButton />
          </div>
        </div>
        <Suspense fallback={<TableSkelton />}>
          <UrlsTable urls={urls} />
        </Suspense>
        <div className="hidden md:flex flex-col w-full px-5 mt-4">
          <Pagination count={total} itemPerPage={PER_PAGE} />
        </div>
      </div>
    </section>
  )
}
