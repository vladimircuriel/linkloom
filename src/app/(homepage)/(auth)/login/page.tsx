import LoginForm from '@components/forms/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LinkLoom | Login',
}

export default function LoginPage() {
  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="flex flex-col items-center p-2 shadow-xl sm:p-14 md:p-20 w-fit gap-y-8 rounded-3xl bg-background-gray-translucent">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-5xl font-extrabold">Log In</h2>
            <p>Log In into your account to keep shortening your links.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
