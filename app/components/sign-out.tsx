import { signOut } from "@/auth"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
          redirectTo: '/',
        })
      }}
    >
      <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        Sign out
      </button>
    </form>
  )
}