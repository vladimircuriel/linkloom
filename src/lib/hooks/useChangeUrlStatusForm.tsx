import { changeUrlStatus } from '@lib/actions/url.action'
import { useActionState, useEffect } from 'react'

import toast from 'react-hot-toast'

export default function useChangeUrlStatusForm() {
  const [state, formAction, isPending] = useActionState(changeUrlStatus, undefined)

  useEffect(() => {
    if (state?.success) {
      toast('Successfully Status Changed!', {
        icon: '✅',
        style: {
          borderRadius: '10px',
          background: '#060b14',
          color: '#fff',
        },
      })
    }
  }, [state, state?.success])

  return {
    state,
    formAction,
    isPending,
  }
}
