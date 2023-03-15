import { fail, redirect } from "@sveltejs/kit"
import { User } from "$lib/server/database.js"
import { IsReadonlyMode } from "$lib/config.js"
import bcrypt from "bcrypt"

export const load = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, "/")
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()
    const email = data.get("email")
    const password = data.get("password")

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email ||
      !password
    ) {
      return fail(400, { error: "Email and password are required" })
    }

    let user = await User.select({
      id: true,
      password_hash: true,
      role: true,
      user_auth_token: true,
      filter_single: { email: email },
    })

    let credential_error = { error: "Invalid email or password" }
    if (!user) {
      return fail(400, credential_error)
    }

    const userPassword = await bcrypt.compare(password, user.password_hash)
    if (!userPassword) {
      return fail(400, credential_error)
    }

    let uuid
    if (IsReadonlyMode()) {
      uuid = user.user_auth_token
    } else {
      uuid = crypto.randomUUID()
      await User.update((u) => ({
        filter_single: { id: user.id },
        set: { user_auth_token: uuid },
      }))
    }

    cookies.set("session", uuid, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      // set cookie to expire after a month
      maxAge: 60 * 60 * 24 * 30,
    })

    if (user.role === "admin") {
      throw redirect(307, "/admin")
    }

    throw redirect(307, "/")
  },
}
