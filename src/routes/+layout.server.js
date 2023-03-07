// get `locals.user` and pass it to the `page` store
export const load = async ({ locals }) => {
  return {
    user: locals.user,
  }
}
