'use client'

import Button from '@components/buttons/Button'
import usePagination from '@lib/hooks/usePagination'

type PaginationProps = Readonly<{
  count?: number
}>

export default function Pagination({ count = 0 }: PaginationProps) {
  const { hasPrevious, hasNext, handleChangePage } = usePagination({ count })

  return (
    <div className="flex items-center justify-between">
      <Button
        disabled={!hasPrevious}
        className="bg-main-gray border-main-gray-border active:bg-main-gray-border"
        onClick={() => handleChangePage('prev')}
      >
        Previous
      </Button>
      <Button
        disabled={!hasNext}
        className="bg-main-gray border-main-gray-border active:bg-main-gray-border"
        onClick={() => handleChangePage('next')}
      >
        Next
      </Button>
    </div>
  )
}
