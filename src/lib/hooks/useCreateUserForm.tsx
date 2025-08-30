import { createUser } from '@lib/actions/user.action'
import { useActionState, useState } from 'react'

export function useCreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, undefined)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleInputChange = () => {
    if (isErrorVisible) setIsErrorVisible(false)
  }

  const handleClick = () => {
    setIsErrorVisible(true)
  }

  return { state, formAction, isPending, isErrorVisible, handleInputChange, handleClick }
}
