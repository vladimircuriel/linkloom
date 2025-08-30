import HeroImage from '@components/brand/svg/HeroImage'
import Button from '@components/buttons/Button'
import Routes from '@lib/constants/routes.constants'
import Link from 'next/link'

export default async function HomePage() {
  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <div>
            <h1 className="text-5xl font-bold inline-flex animate-text-gradient bg-gradient-to-r from-main-blue via-main-pink to-main-blue bg-[200%_auto] bg-clip-text text-transparent">
              {'Shorten Your Looong Links :)'}
            </h1>
            <p>
              LinkLoom is an efficient and easy-to-use URL shortening service that streamlines your
              online experience.
            </p>
          </div>

          <Link href={Routes.SHORTENER}>
            <Button shadow className="bg-main-blue border-main-blue active:bg-main-blue-active">
              Start To Shorten Your Links Now!
            </Button>
          </Link>
        </div>

        <div className="size-96 xl:size-1/3">
          <HeroImage />
        </div>
      </div>
    </section>
  )
}
