'use client'

import SearchIcon from '@components/icons/SearchIcon'
import { useSearchInput } from '@lib/hooks/useSearchInput'

type SearchProperties = {
  placeholder: string
}

export default function SearchInput({ placeholder }: SearchProperties) {
  const { handleSearch } = useSearchInput()

  return (
    <div className="flex items-center justify-center p-2 rounded-lg gap-x-2 bg-main-gray-border">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="w-40 bg-transparent border-none text-main-dark-white focus:outline-none"
        onChange={handleSearch}
      />
    </div>
  )
}
