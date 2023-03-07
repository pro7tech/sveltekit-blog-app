import { Post, Tag, e } from "$lib/server/database.js"

export function load({ url }) {
  const tag = url.searchParams.get("tag")

  const postSelection = (post) => {
    const selection = {
      id: true,
      title: true,
      slug: true,
      snippet: true,
      created_at: true,
      author: {
        username: true,
        first_name: true,
        last_name: true,
        id: true,
        avatar_src: true,
      },
      tags: { name: true, id: true },
      image_src: true,
      order_by: post.title,
    }

    if (tag) {
      selection.filter = e.op(post.tags.name, "=", tag)
    }

    return selection
  }

  return {
    tag: tag,
    posts: Post.select(postSelection),
    tags: Tag.select((tag) => ({
      id: true,
      name: true,
      order_by: tag.name,
    })),
  }
}
