import { Comment, User, Post } from "$lib/server/database.js"

export function load() {
  return {
    items: Comment.select((comment) => ({
      id: true,
      content: true,
      author: { username: true, avatar_src: true, id: true },
      post: { title: true, id: true },
      order_by: comment.created_at,
    })),
    users: User.select((user) => ({
      id: true,
      username: true,
      order_by: user.username,
    })),
    posts: Post.select((post) => ({
      id: true,
      title: true,
      order_by: post.title,
    })),
  }
}

let getForm = (data) => {
  return {
    content: data.get("content"),
    author: data.get("author"),
    post: data.get("post"),
  }
}

let getComment = (data) => {
  let f = getForm(data)
  let options = {
    content: f.content,
    author: User.select_query({
      filter_single: { id: f.author },
    }),
    post: Post.select_query({
      filter_single: { id: f.post },
    }),
  }
  return options
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData()
    try {
      await Comment.insert(getComment(data))
    } catch (error) {
      return { error: error.message, form: getForm(data) }
    }
  },
  update: async ({ request }) => {
    const data = await request.formData()
    try {
      await Comment.update((comment) => ({
        filter_single: { id: data.get("id") },
        set: getComment(data),
      }))
    } catch (error) {
      let form = getForm(data)
      form.id = data.get("id")
      return { error: error.message, form: getForm(data) }
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData()
    try {
      await Comment.delete({ filter_single: { id: data.get("id") } })
    } catch (error) {
      return { error: error.message }
    }
  },
}
