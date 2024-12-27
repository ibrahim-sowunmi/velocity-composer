import { auth } from "@/auth"

export default async function Library() {
  const session = await auth()

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        Welcome {session?.user?.name || 'to Library'}
      </h1>
    </div>
  );
}
