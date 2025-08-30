import Heading from '@components/headings/Heading'
import type { UrlDoc } from '@lib/models/url/url.model'
import formattedDate from '@lib/utils/date'
import UserTable from '@lib/utils/user'
import Link from 'next/link'

type DashboardTransactionProperties = Readonly<{
  urls: UrlDoc[]
}>

export default function DashboardTransaction({ urls }: DashboardTransactionProperties) {
  return (
    <section className="flex flex-col p-5 rounded-lg gap-y-5 bg-main-gray">
      <Heading>Latest Urls</Heading>
      <table className="w-full">
        <thead>
          <tr>
            <td className="p-3 font-bold text-start">User</td>
            <td className="p-3 font-bold">Status</td>
            <td className="p-3 font-bold">Date</td>
            <td className="p-3 font-bold">Url</td>
          </tr>
        </thead>
        <tbody>
          {urls?.map((url) => (
            <tr key={url._id.toString()} className="text-center border-t border-btn-gray-border">
              <td className="p-3">
                <UserTable userId={url.user.toString()} />
              </td>
              <td className="p-3">
                <span
                  className={`p-[5px] rounded-md ${url.status ? ' bg-green-800/50' : ' bg-red-800/50'}`}
                >
                  {url.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-3">{formattedDate(url.createdAt)}</td>
              <td className="p-3">
                <Link
                  href={`${url.shortUrl}`}
                  className="font-bold transition hover:underline hover:text-main-blue-active"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {url.shortUrl}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
