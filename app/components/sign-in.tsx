import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/library" })
      }}
    >
      <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm font-medium">
        Sign in with Google
      </button>
    </form>
  )
} 