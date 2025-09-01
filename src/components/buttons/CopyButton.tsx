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

    toast('Copied to clipboard!', {
      icon: '📋',
      style: {
        borderRadius: '10px',
        background: '#060b14',
        color: '#fff',
      },
    })
  }

  return (
    <button type="button" onClick={() => handleCopy(`https://${text}`)}>
      <CopyIcon />
    </button>
  )
}
