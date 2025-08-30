'use client'

import CopyIcon from '@components/icons/CopyIcon'

type CopyButtonProperties = {
  text: string
}

const CopyButton = ({ text }: CopyButtonProperties) => {
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).catch((error) => {
      throw new Error(`Failed to copy text: ${error}`)
    })
  }

  return (
    <button type="button" onClick={() => handleCopy(text)}>
      <CopyIcon />
    </button>
  )
}

export default CopyButton
