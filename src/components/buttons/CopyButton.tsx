'use client'

import CopyIcon from '@components/icons/CopyIcon'
import toast from 'react-hot-toast'

type CopyButtonProperties = {
  text: string
}

export default function CopyButton({ text }: CopyButtonProperties) {
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).catch((error) => {
      throw new Error(`Failed to copy text: ${error}`)
    })

    toast.success('Copied to clipboard!')
  }

  return (
    <button type="button" onClick={() => handleCopy(text)}>
      <CopyIcon />
    </button>
  )
}
