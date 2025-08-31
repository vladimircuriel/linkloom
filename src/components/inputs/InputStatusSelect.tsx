'use client'

import { useStatusFilter } from '@lib/hooks/useStatusFilter'
import React from 'react'

type StatusSelectProps = {
  className?: string
  shadow?: boolean
  initial?: 'active' | 'disabled' | ''
}

export default function InputStatusSelect({
  className = '',
  shadow = false,
  initial = '',
}: StatusSelectProps) {
  const { handleStatusChange } = useStatusFilter()

  return (
    <select
      id="s"
      name="s"
      defaultValue={initial}
      onChange={handleStatusChange}
      className={`
        bg-main-gray border-2 border-solid border-main-gray-border
        w-64 py-2 px-4 focus:outline-none caret-main-pink rounded-full
        ${shadow ? 'shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]' : ''}
        ${className}
      `}
    >
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="disabled">Disabled</option>
    </select>
  )
}
