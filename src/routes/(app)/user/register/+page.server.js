import { fail, redirect } from "@sveltejs/kit"
import { User } from "$lib/server/database.js"
import bcrypt from "bcrypt"

export const load = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(307, "/")
  }
}

export const actions = {
  // @ts-ignore
  default: async ({ request }) => {
    const data = await request.formData()
    let errors = {}

    let username = data.get("username")
    if (username.length < 3) {
      errors["username"] = "Username must be at least 3 characters"
    }

    let email = data.get("email")
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors["email"] = "Invalid email"
    }

    let password = data.get("password")
    if (password.length < 5) {
      errors["password"] = "Password must be at least 5 characters"
    }

    let confirm_password = data.get("confirm_password")
    if (password !== confirm_password) {
      errors["confirm_password"] = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      return fail(422, {
        username: username,
        email: email,
        errors: errors,
      })
    }

    try {
      await User.insert({
        username: username,
        email: email,
        password_hash: await bcrypt.hash(password, 10),
      })
    } catch (error) {
      return fail(422, {
        username: username,
        email: email,
        error: error.message,
      })
    }

    throw redirect(307, "/")
  },
}
