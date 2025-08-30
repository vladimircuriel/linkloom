import CopyButton from '@components/buttons/CopyButton'
import ActiveLinkIcon from '@components/icons/ActiveLinkIcon'
import InactiveLinkIcon from '@components/icons/InactiveLinkIcon'
import QrIcon from '@components/icons/QrIcon'
import { HOSTNAME } from '@lib/constants/config.constants'
import type { UrlDoc } from '@lib/models/url/url.model'
import { getPreview } from '@lib/utils/preview'
import Image from 'next/image'
import Link from 'next/link'

type UrlsTableProps = Readonly<{
  urls: UrlDoc[]
}>

export default function UrlsTable({ urls }: UrlsTableProps) {
  return (
    <table className="w-full table-auto">
      <thead className="bg-background-gray-translucent backdrop-blur-sm">
        <tr>
          <th className="py-3 rounded-tl-lg">Short Link</th>
          <th className="hidden py-3 lg:table-cell">Original Link</th>
          <th className="py-3 rounded-tr-lg lg:table-cell lg:rounded-none">QR Code</th>
          <th className="hidden py-3 lg:table-cell">Clicks</th>
          <th className="hidden py-3 lg:table-cell">Status</th>
          <th className="hidden py-3 rounded-tr-lg lg:table-cell">Date</th>
        </tr>
      </thead>
      <tbody>
        {urls?.map((url) => (
          <TableItem key={url._id.toString()} url={url} />
        ))}
      </tbody>
    </table>
  )
}

type TableIconProps = Readonly<{
  url: UrlDoc
}>

async function TableItem({ url }: TableIconProps) {
  const { shortUrl, originalUrl, clicks, status, createdAt } = url
  const preview = await getPreview({ urlToPreview: originalUrl })
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <tr className="bg-table-gray backdrop-blur-sm border-y-8 border-y-transparent">
      <td className="flex items-center justify-center py-2 text-center gap-x-3 border-btn-gray-border">
        <Link
          href={`/${shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:underline hover:text-main-blue-active"
        >
          <p>{shortUrl}</p>
        </Link>
        <CopyButton text={`${HOSTNAME}/${shortUrl}`} />
      </td>
      <td className="hidden max-w-md py-2 text-center truncate lg:table-cell border-btn-gray-border">
        <div className="flex items-center justify-center gap-x-4">
          <Image src={preview} alt={`Preview de ${shortUrl}`} width={35} height={35} />
          <Link
            className="transition hover:underline hover:text-main-blue-active"
            target="_blank"
            rel="noopener noreferrer"
            href={originalUrl}
          >
            {originalUrl}
          </Link>
        </div>
      </td>
      <td className="px-4 py-2 text-center border-btn-gray-border">
        <Link
          href={`/qr/${shortUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:underline hover:text-main-blue-active"
        >
          <QrIcon />
        </Link>
      </td>
      <td className="hidden py-2 text-center lg:table-cell border-btn-gray-border">{clicks}</td>
      {status && (
        <td className="items-center justify-center hidden py-2 text-center lg:flex gap-x-3 border-btn-gray-border">
          <p className="text-center text-green-600 min-w-14">Active</p>
          <ActiveLinkIcon />
        </td>
      )}
      {!status && (
        <td className="lg:flex items-center justify-center hidden px-4 py-2 gap-x-3 border-btn-gray-border">
          <p className="text-center text-yellow-600 min-w-14">Inactive</p>
          <InactiveLinkIcon />
        </td>
      )}
      <td className="hidden px-4 py-2 text-center lg:table-cell border-btn-gray-border">
        {formattedDate}
      </td>
    </tr>
  )
}
