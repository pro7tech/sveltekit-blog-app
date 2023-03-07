import { redirect } from "@sveltejs/kit"
import { seed } from "$lib/server/seed.js"
import { User } from "$lib/server/database.js"

export const load = async ({ locals }) => {
  // seed database with demo data if there are no users 
  const users = await User.select({ id: true })
  if (users.length === 0) {
    await seed()
  }

  throw redirect(302, "/posts")
}
