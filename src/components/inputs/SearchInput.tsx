'use client'

import SearchIcon from '@components/icons/SearchIcon'
import { useSearchInput } from '@lib/hooks/useSearchInput'
import React from 'react'

type SearchProperties = {
  placeholder: string
  originalDesign?: boolean
  shadow?: boolean
  className?: string
}

export default function SearchInput({
  placeholder,
  originalDesign = true,
  shadow = false,
  className = '',
}: SearchProperties) {
  const { handleSearch } = useSearchInput()

  if (originalDesign) {
    return (
      <div
        className={`flex items-center justify-center p-2 rounded-lg gap-x-2 bg-main-gray-border ${className}`}
      >
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

  // Nuevo diseño (similar al InputSelect)
  return (
    <div
      className={`
        flex items-center gap-x-2 bg-main-gray border-2 border-solid
        border-main-gray-border w-96 py-3 px-6 rounded-full
        ${shadow ? 'shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]' : ''}
        ${className}
      `}
    >
      <span className="rounded-full bg-main-gray">
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        className="flex-1 bg-transparent border-none focus:outline-none caret-main-pink text-main-dark-white"
      />
    </div>
  )
}
