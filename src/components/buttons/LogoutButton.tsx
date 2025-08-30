import LoginIcon from '@components/icons/LoginIcon'
import { logout } from '@lib/actions/auth.action'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="button"
        className="flex items-center w-full p-3 transition rounded-lg gap-x-3 hover:bg-main-blue/50"
      >
        <LoginIcon />
        Logout
      </button>
    </form>
  )
}
