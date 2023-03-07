<script>
  import SvgIcon from "$lib/SvgIcons.svelte"


  /** @type {import('./$types').LayoutData} */
  export let data
</script>

<div>
  <div class="relative overflow-hidden bg-sky-400 pb-32">
    <header class="relative py-10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">
          {data.title}
        </h1>
      </div>
    </header>
  </div>

  <main class="relative -mt-32">
    <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
      <div class="overflow-hidden rounded-lg bg-white shadow">
        <div
          class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x"
        >
          <aside class="py-6 lg:col-span-3">
            <nav class="space-y-1">
              {#each data.sections as section}
                <a
                  href={section.url}
                  class="{section.active
                    ? 'bg-red-50 border-red-500 text-red-700 hover:bg-red-50 hover:text-red-700'
                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'} group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                  aria-current="page"
                >
                  <SvgIcon
                    icon={section.icon}
                    htmlClass="{section.active
                      ? 'text-red-500 group-hover:text-red-500'
                      : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  />
                  <span class="truncate">{section.name}</span>
                </a>
              {/each}
            </nav>
          </aside>
          <slot />
        </div>
      </div>
    </div>
  </main>
</div>
