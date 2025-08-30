import RegisterForm from '@components/forms/RegisterForm'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LinkLoom | Register',
}

export default function RegisterPage() {
  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="flex flex-col items-center p-2 shadow-xl sm:p-14 md:p-20 w-fit gap-y-8 rounded-3xl bg-background-gray-translucent">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-5xl font-extrabold">Register</h2>
            <p>Create an account to start shortening your links.</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </section>
  )
}
