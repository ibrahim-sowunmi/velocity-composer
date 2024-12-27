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
      <button type="submit" className="inline-flex items-center px-4 py-2 bg-white text-stripe-danger text-sm font-medium rounded-lg border border-stripe-border hover:bg-stripe-light hover:border-stripe-danger shadow-stripe-sm hover:shadow-stripe transition-all duration-200">
        Sign out
      </button>
    </form>
  )
}