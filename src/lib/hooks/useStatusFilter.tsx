import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function useStatusFilter() {
  const searchParameters = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleStatusChange = useDebouncedCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParameters)

    params.set('page', '1')

    if (event.target.value) {
      params.set('s', event.target.value)
    } else {
      params.delete('s')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 25)

  return { handleStatusChange }
}
