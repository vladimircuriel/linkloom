import ChartPieIcon from '@components/icons/ChartPieIcon'

type DashboardCardProperties = {
  title: string
  amount: number
  percentage: number
}

export default function DashboardCard({ title, amount, percentage }: DashboardCardProperties) {
  return (
    <article className="w-full rounded-lg bg-main-gray">
      <div className="flex w-full p-5 transition rounded-lg cursor-pointer gap-x-5 hover:bg-main-blue/50">
        <ChartPieIcon />
        <div className="flex flex-col gap-y-5">
          <span>{title}</span>
          <span className="text-lg font-medium">{amount}</span>
          <span>
            <span className={percentage > 0 ? 'text-green-500' : 'text-red-500'}>
              {percentage}%{' '}
            </span>
            {percentage > 0 ? 'more than previous week' : ' less than previous week'}
          </span>
        </div>
      </div>
    </article>
  )
}
