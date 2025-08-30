'use client'

import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input'
import { useCreateUserForm } from '@lib/hooks/useCreateUserForm'

export default function CreateUserForm() {
  const { state, formAction, isPending, isErrorVisible, handleInputChange, handleClick } =
    useCreateUserForm()

  return (
    <form action={formAction} className="flex flex-col items-center justify-center gap-y-5">
      <label htmlFor="name">
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          className="!w-[550px]"
          required
          shadow
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="email">
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="!w-[550px]"
          required
          shadow
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="password">
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          className="!w-[550px]"
          required
          shadow
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="confirm-password">
        <Input
          id="confirm-password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="!w-[550px]"
          required
          shadow
          onChange={handleInputChange}
        />
      </label>

      {isErrorVisible && state?.error && <p className="text-red-500">{state.error}</p>}

      <Button
        className="bg-main-blue border-main-blue active:bg-main-blue-active"
        shadow
        onClick={handleClick}
        disabled={isPending}
      >
        Create User
      </Button>
    </form>
  )
}
