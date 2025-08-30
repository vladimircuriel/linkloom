import CreateUserForm from '@components/forms/CreateUserForm'

export default function DashboardCreateUserPage() {
  return (
    <section>
      <div className="flex flex-col items-center w-full py-10 shadow-xl gap-y-8 rounded-3xl bg-background-gray">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-5xl font-extrabold">Create a new user</h2>
          <p>Create an account for a new user.</p>
        </div>
        <CreateUserForm />
      </div>
    </section>
  )
}
