<script>
  import { page } from "$app/stores"
  import { t, all } from "$lib/tailwind.js"
  import { enhance } from "$app/forms"
  import FormMessage from "$lib/form-message.svelte"
  export let data
  export let form
  let post = data.post

  let green_link =
    "text-gray-800 hover:text-green-500 no-underline border-b-2 border-green-500"

  // get tags as comma separated string
  let tags = post.tags.map((item) => item.name).join(", ")

  let signedIn = $page.data.user ? true : false
  let commentBackground = signedIn ? "bg-white " : "bg-gray-50 "
  let commentClasses =
    commentBackground + "px-0 w-full text-sm text-gray-900 border-0 "
  if (signedIn) {
    commentClasses += "focus:ring-0"
  }
</script>

<svelte:head>
  <style>
    #blog-post h1, h2 {
      font-weight: bold;
    }
  </style>
</svelte:head>

{#if form?.error || form?.success}
  <div class="container max-w-5xl mx-auto mt-4">
    <FormMessage {form} />
  </div>
{/if}

<div class="text-center pt-16 md:pt-32">
  <p class="text-sm md:text-base text-green-500 font-bold">
    {tags}
  </p>
  <h1 class="font-bold break-normal text-3xl md:text-5xl">
    {post.title}
  </h1>
</div>

<div
  class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
  style="background-image:url({post.image_src}); height: 55vh;"
/>

<div class="container max-w-5xl mx-auto -mt-32">
  <div class="mx-0 sm:mx-6">
    <div
      id="blog-post"
      class="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal"
      style="font-family:Georgia,serif;"
    >
      {@html post.content}
    </div>

    <div
      class="container font-sans bg-green-100 rounded mt-8 p-4 md:p-24 text-center"
    >
      <h2 class="font-bold break-normal text-2xl md:text-4xl">
        Subscribe to Blog
      </h2>
      <h3
        class="font-bold break-normal font-normal text-gray-600 text-base md:text-xl"
      >
        Get the latest posts delivered right to your inbox
      </h3>
      <div class="w-full text-center pt-4">
        <form action="#">
          <div class="max-w-sm mx-auto p-1 pr-0 flex flex-wrap items-center">
            <input
              type="email"
              placeholder="youremail@example.com"
              class="flex-1 appearance-none rounded shadow p-3 text-gray-600 mr-2 focus:outline-none"
            />
            <button
              type="submit"
              class="flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400"
              >Subscribe</button
            >
          </div>
        </form>
      </div>
    </div>

    <div class="flex w-full items-center font-sans p-8 md:p-24">
      <img
        class="w-10 h-10 rounded-full mr-4"
        src={post.author.avatar_src}
        alt="Avatar of Author"
      />
      <div class="flex-1">
        <p class="text-base font-bold text-base md:text-xl leading-none">
          {post.created_at.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p class="text-gray-600 text-xs md:text-base">
          {post.author.full_name}
        </p>
      </div>
      <div class="justify-end">
        <a href="/">
          <button
            class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full"
            >Go to Posts</button
          >
        </a>
      </div>
    </div>
  </div>

  <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white ">
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article
        class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue"
      >
        <section class="not-format">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 ">
              Discussion
            </h2>
          </div>

          <FormMessage {form} />

          <form use:enhance class="mb-6" action="?/comment" method="POST">
            <div
              class="{commentBackground} py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-200 "
            >
              <label for="comment" class="sr-only">Your comment</label>

              <textarea
                name="comment"
                rows="6"
                class={commentClasses}
                placeholder="Write a comment..."
                required
              />
            </div>

            {#if signedIn}
              <button type="submit" class={t.blue_button}>
                Post comment
              </button>
            {:else}
              <a href="/user/sign-in" class={green_link}>Sign in</a> or
              <a href="/user/register" class={green_link}>Register</a> to post a
              comment.
            {/if}
          </form>
          {#each post.comments as comment}
            <article
              class="p-6 mb-6 text-base bg-white border-t border-gray-200 "
            >
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p
                    class="inline-flex items-center mr-3 text-sm text-gray-900"
                  >
                    <img
                      alt="avatar"
                      class="mr-2 w-6 h-6 rounded-full"
                      src={comment.author.avatar_src}
                    />
                    {comment.author.full_name}
                  </p>
                  <p class="text-sm text-gray-600 ">
                    {comment.created_at.toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </footer>
              <p>{comment.content}</p>
            </article>
          {/each}
        </section>
      </article>
    </div>
  </main>
</div>
