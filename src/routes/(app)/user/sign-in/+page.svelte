<script lang="ts">
  import { enhance } from "$app/forms"
  import { t } from "$lib/tailwind.js"
  import FormMessage from "$lib/form-message.svelte"

  export let form
</script>

<div
  class="bg-gray-100 flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="w-full max-w-md mb-60 space-y-8">
    <div class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
      <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Your Company" />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Don't have an account?
        <a
          href="/user/register"
          class="font-medium text-sky-400 hover:text-sky-400">Register here</a
        >
      </p>

      <div class="mt-4">
        <FormMessage {form} />
      </div>

      <form use:enhance class="space-y-6 mt-4" action="#" method="POST">
        <div>
          <label for="password" class={t.label}>Email</label>
          <div class="mt-1">
            <input
              name="email"
              type="email-address"
              autocomplete="email-address"
              required
              class={t.input}
            />
          </div>
        </div>

        <div>
          <label for="password" class={t.label}>Password</label>
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="password"
              required
              class={t.input}
            />
          </div>
        </div>

        <div>
          <button type="submit" class={t.full_button}>Sign In</button>
        </div>
      </form>
    </div>
  </div>
</div>
