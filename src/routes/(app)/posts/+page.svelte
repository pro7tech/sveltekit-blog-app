<script>
  import Card from "./Card.svelte"

  export let data

  let selected = "bg-sky-600 text-white"
  let unselected = "bg-sky-200 text-sky-900"
</script>

<svelte:head>
  <meta name="description" content="Explore the Fullstack Blog App and learn about topics such as EdgeDB, SvelteKit, and Tailwind.">
</svelte:head>

<div
  class="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28"
>
  <div class="absolute inset-0">
    <div class="h-1/3 bg-gray-50 sm:h-2/3" />
  </div>
  <div class="relative mx-auto max-w-7xl">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Fullstack Blog App
      </h2>
      <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
        Click a tag to explore posts by topic
      </p>
    </div>

    <div class="text-center">
      <div class="mx-auto max-w-3xl">
        <div class="space-y-5 sm:space-y-4">
          <a
            href={"?"}
            class="m-1 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium {data.tag ==
            null
              ? selected
              : unselected}">All</a
          >
          {#each data.tags as tag}
            <a
              href={"?tag=" + encodeURIComponent(tag.name)}
              class="m-1 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium {data.tag ==
              tag.name
                ? selected
                : unselected}">{tag.name}</a
            >
          {/each}
        </div>
      </div>
    </div>

    <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {#each data.posts as post}
        <Card
          image_src={post.image_src}
          tags={post.tags}
          title={post.title}
          slug={post.slug}
          description={post.snippet}
          author={post.author.first_name + " " + post.author.last_name}
          avatar_src={post.author.avatar_src}
          date={new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      {/each}
    </div>
  </div>
</div>
