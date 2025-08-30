'use client'

import Button from '@components/buttons/Button'
import useChangeUrlStatusForm from '@lib/hooks/useChangeUrlStatusForm'
import { Toaster } from 'react-hot-toast'

type ChangeUrlStatusFormProperties = Readonly<{
  urlId: string
}>

export default function ChangeUrlStatusForm({ urlId }: ChangeUrlStatusFormProperties) {
  const { state, formAction, isPending } = useChangeUrlStatusForm()

  return (
    <>
      <Toaster />
      <form action={formAction}>
        <input type="text" name="urlId" value={urlId} className="sr-only" onChange={() => ''} />
        <Button isDisabled={isPending} className="bg-blue-800 border-blue-800 !p-1 !rounded-md">
          Alter
        </Button>

        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </>
  )
}
