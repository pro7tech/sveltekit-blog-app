import { redirect } from "@sveltejs/kit"

export const load = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  throw redirect(307, "/")
}

export const actions = {
  default({ cookies }) {
    cookies.delete("session", { path: "/" })
    throw redirect(307, "/user/sign-in")
  },
}
