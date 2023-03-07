<script>
  import SvgIcon from "$lib/SvgIcons.svelte"
  export let staticSidebar = true
  let isDesktop = staticSidebar
  /**
   * @type {string}
   */
  let defaultText

  let items = [
    { href: "/", icon: "outline/home", label: "Frontend" },
    { href: "/admin/users", icon: "outline/users", label: "Users" },
    { href: "/admin/tags", icon: "outline/key", label: "Tags" },
    { href: "/admin/posts", icon: "outline/folder", label: "Posts" },
    { href: "/admin/comments", icon: "outline/inbox", label: "Comments" },
  ]
</script>

{#each items as item}
  <a
    href={item.href}
    class="{isDesktop
      ? 'text-white hover:bg-sky-500'
      : 'text-gray-600 hover:bg-gray-100'}  group flex items-center px-2 py-2 text-sm font-medium rounded-md"
  >
    <SvgIcon
      icon={item.icon}
      htmlClass="mr-3 flex-shrink-0 h-6 w-6 {isDesktop
        ? 'text-gray-200 '
        : 'text-gray-400 '} "
    />
    {item.label}
  </a>
{/each}
