import { fail, redirect } from "@sveltejs/kit"
import { User } from "$lib/server/database.js"

export const load = async ({ locals, cookies }) => {
  if (!locals.user) {
    throw redirect(307, "/user/sign-in")
  }

  return {
    user: User.select({
      email: true,
      username: true,
      first_name: true,
      last_name: true,
      role: true,
      filter_single: { user_auth_token: cookies.get("session") },
    }),
  }
}

let getForm = (data) => {
  return {
    first_name: data.get("first_name"),
    last_name: data.get("last_name"),
  }
}

export const actions = {
  // @ts-ignore
  default: async ({ request, cookies }) => {
    const data = await request.formData()

    let form = getForm(data)

    try {
      await User.update((user) => ({
        filter_single: { user_auth_token: cookies.get("session") },
        set: form,
      }))
      return { success: "Settings updated" }
    } catch (error) {
      return { error: error.message, form: form }
    }
  },
}
