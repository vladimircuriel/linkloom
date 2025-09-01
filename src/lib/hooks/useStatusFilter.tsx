import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useStatusFilter() {
  const searchParameters = useSearchParams()

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const parameters = new URLSearchParams(searchParameters)

      parameters.set('page', '1')

      if (event.target.value) {
        parameters.set('s', event.target.value)
      } else {
        parameters.delete('s')
      }

      window.history.pushState({}, '', `${window.location.pathname}?${parameters.toString()}`)
    },
    [searchParameters],
  )

  return { handleStatusChange }
}
