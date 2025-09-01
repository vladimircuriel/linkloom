import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type usePaginationProps = Readonly<{
  count: number
  itemPerPage?: number
}>

export default function usePagination({ count, itemPerPage = 5 }: usePaginationProps) {
  const searchParameters = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const page = searchParameters.get('page') || 1
  const parameters = new URLSearchParams(searchParameters)

  const hasPrevious = itemPerPage * (+page - 1) > 0
  const hasNext = itemPerPage * (+page - 1) + itemPerPage < count

  const handleChangePage = (type: string) => {
    type === 'prev'
      ? parameters.set('page', (+page - 1).toString())
      : parameters.set('page', (+page + 1).toString())
    window.location.href = `${pathname}?${parameters.toString()}`
  }

  return { hasPrevious, hasNext, handleChangePage }
}
