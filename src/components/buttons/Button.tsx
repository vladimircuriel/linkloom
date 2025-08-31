type ButtonProperties = Readonly<{
  children: React.ReactNode
  className?: string
  shadow?: boolean
  isDisabled?: boolean
}>

export default function Button({
  children,
  className = '',
  shadow = false,
  isDisabled = false,
  ...properties
}: ButtonProperties & React.ButtonHTMLAttributes<HTMLButtonElement> & {}) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-fit border border-solid rounded-full px-6 py-2 md:py-3 transition hover:scale-105 ${shadow ? 'shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.20)]' : ''} ${className}`}
      {...properties}
    >
      <p className={isDisabled ? 'opacity-50' : ''}>{children}</p>
    </button>
  )
}
