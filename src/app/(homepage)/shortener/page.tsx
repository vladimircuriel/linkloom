import UrlForms from '@components/forms/UrlForm'

export default function ShortenerPage() {
  return (
    <section className="py-8">
      <div className="flex flex-col items-center justify-center gap-y-10">
        <h2 className="sr-only">All your shorten urls</h2>
        <UrlForms />
        {/* <Suspense fallback={<ListSkeleton />}> */}
        {/* <Table urls={urls} /> */}
        {/* </Suspense> */}
      </div>
    </section>
  )
}
