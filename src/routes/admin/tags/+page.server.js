import { Tag } from "$lib/server/database.js"

export function load({ cookies }) {
  return {
    items: Tag.select((tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
  }
}

let getForm = (data) => {
  return {
    name: data.get("name"),
  }
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await Tag.insert(getForm(data))
    } catch (error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    try {
      await Tag.update((tag) => ({
        filter_single: { id: data.get("id") },
        set: getForm(data),
      }))
    } catch (error) {
      let form = getForm(data)
      form.id = data.get("id")
      return { error: error.message, form: form }
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData()
    try {
      await Tag.delete({ filter_single: { id: data.get("id") } })
    } catch (error) {
      return { error: error.message }
    }
  },
}
