import Routes from '@lib/constants/routes.constants'
import Link from 'next/link'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="flex items-center justify-between p-4 rounded-lg bg-main-gray">
        <Link href={Routes.HOME}>
          <h2 className="text-2xl font-extrabold sm:text-4xl md:text-3xl lg:text-5xl">LinkLoom</h2>
        </Link>
        <Credits className="hidden md:block" />
        <div className="flex items-center justify-start gap-x-3">
          <Link href={Routes.HOME}>Home</Link>
        </div>
      </div>
      <Credits className="pt-3 md:hidden" />
    </footer>
  )
}

function Credits({ className }: Readonly<{ className?: string }>) {
  return (
    <p className={className}>
      © {currentYear}{' '}
      <Link className="text-blue-500 underline" href="https://github.com/vladimircuriel">
        Vladimir Curiel
      </Link>{' '}
      &nbsp;& &nbsp;
      <Link className="text-blue-500 underline" href="https://github.com/Natashalopez05">
        Natasha López
      </Link>{' '}
      &nbsp;|&nbsp;&nbsp;
      <Link className="text-blue-500 underline" href="https://www.figma.com/@mohammedhijas">
        Mohi
      </Link>
    </p>
  )
}
