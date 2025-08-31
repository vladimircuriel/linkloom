import { createShortUrl } from '@lib/actions/url.action'
import { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function useUrlForm() {
  const [state, formAction, isPending] = useActionState(createShortUrl, undefined)

  useEffect(() => {
    if (state?.success) {
      toast('URL Created Successfully!', {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#060b14',
          color: '#fff',
        },
      })
    }
  }, [state, state?.success])

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error, {
        style: {
          borderRadius: '10px',
          background: '#060b14',
          color: '#fff',
        },
      })
    }
  }, [state, state?.error])

  useEffect(() => {
    if (isPending) {
      toast.loading('Creating short URL...', {
        icon: '⏳',
        duration: 1000,
        style: {
          borderRadius: '10px',
          background: '#060b14',
          color: '#fff',
        },
      })
    }
  }, [isPending])

  return { state, formAction, isPending }
}
