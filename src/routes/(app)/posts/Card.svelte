<script>
  // @ts-nocheck

  export let image_src
  export let tags
  export let title
  export let slug
  export let description
  export let author
  export let avatar_src
  export let date

  // if words greater than 200 characters show ellipse
  if (description && description.length > 200) {
    description = description.slice(0, 200) + "..."
  }
</script>

<div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
  <a href="/posts/{slug}">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" src={image_src} alt="" />
    </div>
    <div class="flex flex-1 flex-col justify-between bg-white p-6">
      <div class="flex-1">
        <p class="text-sm font-medium text-sky-600">
          {tags.map((item) => item.name).join(", ")}
        </p>
        <div class="mt-2 block">
          <p class="text-xl font-semibold text-gray-900">{title}</p>
          <p class="mt-3 text-base text-gray-500">{@html description}</p>
        </div>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <div>
            <span class="sr-only">{author}</span>
            <img class="h-10 w-10 rounded-full" src={avatar_src} alt="" />
          </div>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">{author}</a>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time datetime="2020-03-16">{date}</time>
          </div>
        </div>
      </div>
    </div>
  </a>
</div>
