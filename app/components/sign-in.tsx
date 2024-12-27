import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/library" })
      }}
    >
      <button type="submit"  className="inline-flex items-center px-4 py-2 bg-stripe-primary text-white text-sm font-medium rounded-lg hover:bg-stripe-primary-dark shadow-stripe-sm hover:shadow-stripe transition-all duration-200">
        Sign in with Google
      </button>
    </form>
  )
} 