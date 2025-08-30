import { login } from '@lib/actions/auth.action'
import { useActionState, useState } from 'react'

export function useLoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleInputChange = () => {
    if (isErrorVisible) setIsErrorVisible(false)
  }

  const handleClick = () => {
    setIsErrorVisible(true)
  }

  return { state, formAction, isPending, isErrorVisible, handleInputChange, handleClick }
}
