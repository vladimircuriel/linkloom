import { createShortUrl } from '@lib/actions/url.action'
import { useActionState } from 'react'

export default function useUrlForm() {
  const [state, formAction, isPending] = useActionState(createShortUrl, undefined)

  return { state, formAction, isPending }
}
