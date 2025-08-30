type InputSelectProps = Readonly<{
  name?: string
  className?: string
  shadow?: boolean
  admin?: boolean
}>

export default function InputSelect({
  name = 'isAdmin',
  className = '',
  shadow = false,
  admin = false,
}: InputSelectProps) {
  return (
    <select
      id={name}
      name={name}
      required
      defaultValue={String(admin)}
      className={`bg-main-gray border-2 border-solid border-main-gray-border w-96 py-3 px-6 focus:outline-none caret-main-pink rounded-full ${
        shadow ? 'shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]' : ''
      } ${className}`}
    >
      <option value="true">Admin</option>
      <option value="false">User</option>
    </select>
  )
}
