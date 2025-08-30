type HeadingProperties = {
  children: React.ReactNode
}
export default function Heading({ children }: HeadingProperties) {
  return <h2 className="text-xl font-light text-start text-main-dark-white">{children}</h2>
}
