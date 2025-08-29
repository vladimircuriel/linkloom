'use client'

import Button from '@components/buttons/Button'
import Input from '@components/inputs/Input'
import Link from 'next/link'

export default function LoginForm() {
  // const { formAction, state, error, handleInputChange, handleClick } =
  //   useLoginForm();

  return (
    <form className="flex flex-col items-center justify-center gap-y-5">
      <label htmlFor="email">
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          shadow
          required
          // onChange={handleInputChange}
        />
      </label>
      <label htmlFor="password">
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          shadow
          required
          // onChange={handleInputChange}
        />
      </label>

      <Button
        className="bg-main-blue border-main-blue active:bg-main-blue-active"
        shadow
        // onClick={handleClick}
      >
        Login into your account
      </Button>
      <Link href="/register">
        <p className="text-main-blue hover:text-main-blue-active">
          {"Don't have an account?"} <strong>Register</strong>
        </p>
      </Link>
      {/* {isErrorVisible && state?.error && <p className="text-red-500">{state.error}</p>} */}
    </form>
  )
}
