import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type usePaginationProps = Readonly<{
  count: number
}>

export default function usePagination({ count }: usePaginationProps) {
  const searchParameters = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const page = searchParameters.get('page') || 1
  const parameters = new URLSearchParams(searchParameters)
  // could be in an env file
  const ITEM_PER_PAGE = 5

  const hasPrevious = ITEM_PER_PAGE * (+page - 1) > 0
  const hasNext = ITEM_PER_PAGE * (+page - 1) + ITEM_PER_PAGE < count

  const handleChangePage = (type: string) => {
    type === 'prev'
      ? parameters.set('page', (+page - 1).toString())
      : parameters.set('page', (+page + 1).toString())
    replace(`${pathname}?${parameters}`)
  }

  return { hasPrevious, hasNext, handleChangePage }
}
