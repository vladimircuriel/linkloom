'use client'

import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input'
import Link from 'next/link'
import { useRegisterForm } from '@/src/lib/hooks/useRegisterForm'

export default function RegisterForm() {
  const { state, formAction, isPending, isErrorVisible, handleInputChange, handleClick } =
    useRegisterForm()

  return (
    <form action={formAction} className="flex flex-col items-center justify-center gap-y-5">
      <label htmlFor="name">
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
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
        Create your account now
      </Button>

      <Link href="/login">
        <p className="text-main-blue hover:text-main-blue-active">
          Have an account? <strong>Log in</strong>
        </p>
      </Link>
    </form>
  )
}
