<script>
  import SvgIcon from "$lib/SvgIcons.svelte"
  import Sections from "./SidebarSections.svelte"
  import ProfileSection from "./SidebarProfileSection.svelte"
  import DemoModeHeader from "$lib/demo-mode-header.svelte";
  let isMobileMenuOpen = false
</script>


<div>
  <!-- Off-canvas menu for mobile -->
  <div class="{isMobileMenuOpen ? '' : 'hidden'} relative z-40 md:hidden">
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />

    <div class="fixed inset-0 z-40 flex">
      <div class="relative flex w-full max-w-xs flex-1 flex-col bg-white">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            on:click={() => (isMobileMenuOpen = false)}
            type="button"
            class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <SvgIcon icon="outline/x-mark" htmlClass="h-6 w-6 text-white" />
          </button>
        </div>

        <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img class="h-8 w-auto" src="/logo.svg" alt="" />
          </div>
          <nav class="mt-5 space-y-1 px-2">
            <Sections staticSidebar={false} />
          </nav>
        </div>
        <ProfileSection staticSidebar={false} />
      </div>

      <div class="w-14 flex-shrink-0">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
    <div
      class="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-sky-400"
    >
      <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div class="flex flex-shrink-0 items-center px-4">
          <img class="h-8 w-auto" src="/logo.svg" alt="" />
        </div>
        <nav class="mt-5 flex-1 space-y-1 bg-sky-400 px-2">
          <Sections staticSidebar={true} />
        </nav>
      </div>

      <ProfileSection staticSidebar={true} />
    </div>
  </div>
  <div class="flex flex-1 flex-col md:pl-64">
    <div
      class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden"
    >
      <button
        on:click={() => {
          isMobileMenuOpen = !isMobileMenuOpen
        }}
        type="button"
        class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
      >
        <SvgIcon icon="outline/bars-3" htmlClass="h-6 w-6" />
      </button>
    </div>
    <div class="m-4">
      <DemoModeHeader admin={true} />
      <slot />
    </div>
  </div>
</div>
