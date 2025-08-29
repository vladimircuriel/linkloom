type InputProperties = Readonly<{
  className?: string
  shadow?: boolean
}>

export default function Input({
  className = '',
  shadow = false,
  ...properties
}: InputProperties & React.InputHTMLAttributes<HTMLInputElement> & {}) {
  return (
    <input
      className={`bg-main-gray border-2 border-solid border-main-gray-border w-96 py-3 px-6 focus:outline-none caret-main-pink rounded-full ${shadow ? 'shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px' : ''} ${className}`}
      {...properties}
    ></input>
  )
}
