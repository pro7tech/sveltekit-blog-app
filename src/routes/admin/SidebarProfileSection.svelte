<script>
  import { page } from "$app/stores"

  export let staticSidebar
  let isStatic = staticSidebar
</script>

<div
  class="flex flex-shrink-0 border-t {isStatic
    ? 'border-white'
    : 'border-gray-200'} p-4"
>
  <a
    href="/user/settings"
    class="group block {isStatic ? '' : 'w-full'} flex-shrink-0"
  >
    <div class="flex items-center">
      <div>
        <img
          class="inline-block {isStatic ? 'h-9 w-9' : 'h-10 w-10'} rounded-full"
          src={$page.data.user.avatar_src}
          alt=""
        />
      </div>
      <div class="ml-3">
        <p
          class="font-medium {isStatic
            ? 'text-white text-base'
            : 'text-sm text-sky-900'}"
        >
          {$page.data.user.first_name}
          {$page.data.user.last_name}
        </p>
        <p
          class="font-medium {isStatic
            ? 'text-xs text-gray-200 group-hover:text-white'
            : 'text-sm text-gray-500 group-hover:text-gray-700'}"
        >
          View profile
        </p>
      </div>
    </div>
  </a>
</div>
