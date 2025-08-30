import { editUser } from '@lib/actions/user.action'
import { useActionState, useState } from 'react'

export function useEditUserForm() {
  const [state, formAction, isPending] = useActionState(editUser, undefined)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleInputChange = () => {
    if (isErrorVisible) setIsErrorVisible(false)
  }

  const handleClick = () => {
    setIsErrorVisible(true)
  }

  return { state, formAction, isPending, isErrorVisible, handleInputChange, handleClick }
}
