import { deleteUser } from '@lib/actions/user.action'
import { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function useDeleteUserForm() {
  const [state, formAction, isPending] = useActionState(deleteUser, undefined)

  useEffect(() => {
    if (state?.success) {
      toast('User Deleted Successfully!', {
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
