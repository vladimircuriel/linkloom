'use client'

import Button from './Button'

export default function ApplySearchButton() {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        className="!px-2 !py-2 bg-main-blue border-main-blue active:bg-main-blue-active"
        shadow
        onClick={() => window.location.reload()}
      >
        Apply Search
      </Button>

      <Button
        className="!px-2 !py-2 bg-main-gray border-main-gray-border active:bg-main-gray-border"
        onClick={() => {
          window.location.href = window.location.pathname
        }}
      >
        Reset
      </Button>
    </div>
  )
}
