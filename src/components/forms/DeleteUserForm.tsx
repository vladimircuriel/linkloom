'use client'

import Button from '@components/buttons/Button'
import useDeleteUserForm from '@lib/hooks/useDeleteUserForm'

type DeleteUserFormProps = Readonly<{
  userId: string
}>

export default function DeleteUserForm({ userId }: DeleteUserFormProps) {
  const { formAction, isPending } = useDeleteUserForm()

  return (
    <form action={formAction}>
      <input type="text" name="userId" defaultValue={userId} className="sr-only" />
      <Button isDisabled={isPending} className="bg-red-800 border-red-800 !p-1 !rounded-md">
        Delete
      </Button>
    </form>
  )
}
