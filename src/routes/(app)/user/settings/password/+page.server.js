import { fail, redirect } from "@sveltejs/kit"
import { User } from "$lib/server/database.js"
import bcrypt from "bcrypt"

export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(307, "/")
  }
}

export const actions = {
  // @ts-ignore
  default: async ({ request, cookies }) => {
    const data = await request.formData()
    let current_password = data.get("current_password")
    let password = data.get("password")
    let confirm_password = data.get("confirm_password")

    let errors = {}

    if (
      typeof current_password !== "string" ||
      typeof password !== "string" ||
      typeof confirm_password !== "string" ||
      !current_password ||
      !password ||
      !confirm_password
    ) {
      return fail(400, { error: "All fields are required" })
    }

    const user = await User.select({
      password_hash: true,
      filter_single: { user_auth_token: cookies.get("session") },
    })

    const userPassword = await bcrypt.compare(
      current_password,
      user.password_hash
    )
    if (!userPassword) {
      errors["current_password"] = "Password does not match current password"
    }

    if (password.length < 5) {
      errors["password"] = "Password must be at least 5 characters"
    }

    if (password !== confirm_password) {
      errors["confirm_password"] = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      return fail(422, {
        errors: errors,
      })
    }

    let hash = await bcrypt.hash(password, 10)

    try {
      await User.update((user) => ({
        filter_single: { user_auth_token: cookies.get("session") },
        set: { password_hash: hash },
      }))
    } catch (error) {
      return fail(422, {
        error: error.message,
      })
    }

    return { success: "Password updated" }
  },
}
