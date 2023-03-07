import { Comment, User, Post } from "$lib/server/database.js"

export function load({ params }) {
  return {
    post: Post.select({
      id: true,
      title: true,
      content: true,
      created_at: true,
      author: {
        username: true,
        full_name: true,
        first_name: true,
        last_name: true,
        id: true,
        avatar_src: true,
      },
      tags: { name: true, id: true },
      image_src: true,
      comments: {
        id: true,
        content: true,
        created_at: true,
        author: {
          full_name: true,
          avatar_src: true
        },
      },
      filter_single: { slug: params.slug },
    }),
  }
}

export const actions = {
  // @ts-ignore
  comment: async ({ request, cookies, params }) => {
    const data = await request.formData()

    let comment = {
      content: data.get("comment"),
      author: User.select_query({
        filter_single: { user_auth_token: cookies.get("session") },
      }),
      post: Post.select_query({
        filter_single: { slug: params.slug },
      }),
    }
    try {
      await Comment.insert(comment)
      return { success: "Comment added" }
    } catch (error) {
      return { error: error.message }
    }
  },
}
