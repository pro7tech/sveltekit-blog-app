<script>
  import { page } from "$app/stores"
  import { t } from "$lib/tailwind.js"
  import DemoModeHeader from "$lib/demo-mode-header.svelte"
</script>

<DemoModeHeader />

<header class="bg-sky-400">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div
      class="flex w-full items-center justify-between border-b border-sky-500 py-6 lg:border-none"
    >
      <div class="flex items-center">
        <a href="/" aria-label="Goto home page">
          <img class="h-10 w-auto" src="/logo.svg" alt="" />
        </a>
        <div class="ml-10 hidden space-x-8 lg:block">
          <a
            href="/"
            class="text-xl  font-extrabold text-white hover:text-sky-50"
            >SVELTEKIT BLOG APP</a
          >
        </div>
      </div>
      <div class="ml-10 space-x-4">
        {#if !$page.data.user}
          <a href="/user/sign-in" class={t.white_button}>Sign In</a>
          <a href="/user/register" class={t.white_button}>Register</a>
        {:else}
          {#if $page.data.user.role === "admin"}
            <a href="/admin" class={t.white_button}>Admin</a>
          {/if}

          <a class={t.white_button} href="/user/settings">Settings</a>

          <form class={t.white_button} action="/user/sign-out" method="POST">
            <button type="submit">Log out</button>
          </form>
        {/if}
      </div>
    </div>
  </nav>
</header>
