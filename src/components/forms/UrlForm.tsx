'use client'

import Button from '@components/buttons/Button'
import UrlFormIcon from '@components/icons/UrlFormIcon'
import useUrlForm from '@lib/hooks/useUrlForm'

export default function UrlForms() {
  const { state, formAction, isPending } = useUrlForm()

  return (
    <form
      action={formAction}
      id="url-form"
      className="flex flex-col items-center justify-center w-11/12 gap-3 p-1"
    >
      <div className="flex items-center w-full md:w-2/3 px-2 py-1.5 border-2 border-solid rounded-full gap-x-2 bg-main-gray border-main-gray-border">
        <UrlFormIcon />
        <div className="flex justify-start w-11/12">
          <input
            className="w-full bg-main-gray caret-main-pink focus:outline-none"
            type="text"
            name="originalUrl"
            placeholder="Enter the link here"
            required
            disabled={isPending}
          />
        </div>
        <div>
          <Button
            className="bg-main-blue border-main-blue active:bg-main-blue-active min-w-48"
            shadow
            form="url-form"
            disabled={isPending}
          >
            Shorten Now!
          </Button>
        </div>
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  )
}
