'use client'

import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input'
import { useEditUserForm } from '@lib/hooks/useEditUserForm'
import type { UserDoc } from '@lib/models/user/user.model'
import InputSelect from '../inputs/InputSelect'

type EditUserFormProps = Readonly<{
  user: UserDoc
}>

export default function EditUserForm({ user }: EditUserFormProps) {
  const { state, formAction, isPending, isErrorVisible, handleInputChange, handleClick } =
    useEditUserForm()

  return (
    <form action={formAction} className="flex flex-col items-center justify-center gap-y-5 flex-3">
      <input type="text" name="userId" defaultValue={user._id.toString()} className="sr-only" />

      <label htmlFor="name">
        <Input
          id="name"
          type="text"
          name="name"
          defaultValue={user.name}
          shadow
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="email">
        <Input
          id="email"
          type="email"
          name="email"
          defaultValue={user.email}
          shadow
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="isAdmin">
        <InputSelect name="isAdmin" admin={user.isAdmin} shadow />
      </label>

      <Button
        className="bg-main-blue border-main-blue active:bg-main-blue-active"
        shadow
        disabled={isPending}
        onClick={handleClick}
      >
        Update user account
      </Button>

      {isErrorVisible && state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  )
}
