import { useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function useSearchInput() {
  const searchParameters = useSearchParams()

  const handleSearch = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const parameters = new URLSearchParams(searchParameters)

    parameters.set('page', '1')

    if (event.target.value) event.target.value.length > 2 && parameters.set('q', event.target.value)
    else parameters.delete('q')

    window.history.pushState({}, '', `${window.location.pathname}?${parameters.toString()}`)
  }, 300)

  return { handleSearch, searchParameters }
}
