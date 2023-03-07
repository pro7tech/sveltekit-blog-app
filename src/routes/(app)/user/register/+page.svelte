<script>
  import { enhance } from "$app/forms"
  import { t } from "$lib/tailwind.js"
  import FormMessage from "$lib/form-message.svelte"
  import FieldErrorMessage from "$lib/field-error-message.svelte"

  /** @type {import('./$types').ActionData} */
  export let form
</script>

<div
  class="bg-gray-100 flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class=" w-full max-w-md mb-55 space-y-8">
    <div class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
      <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="" />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Sign up for an account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Already registered?
        <a
          href="/user/sign-in"
          class="font-medium text-sky-400 hover:text-sky-400">Sign in</a
        >
        to your account
      </p>

      <form use:enhance class="space-y-6" method="POST">
        <div class="mt-4">
          <FormMessage {form} />
        </div>

        <div>
          <label for="new-password" class={t.label}>Username</label>
          <div class="mt-1">
            <input name="username" type="username" required class={t.input} />
          </div>
          <FieldErrorMessage message={form?.errors?.username} />
        </div>

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
          <FieldErrorMessage message={form?.errors?.email} />
        </div>

        <div>
          <label for="password" class={t.label}>Password</label>
          <div class="mt-1">
            <input
              name="password"
              type="password"
              autocomplete="password"
              required
              class={t.input}
            />
          </div>
          <FieldErrorMessage message={form?.errors?.password} />
        </div>

        <div>
          <label for="password" class={t.label}>Confirm Password</label>
          <div class="mt-1">
            <input
              name="confirm_password"
              type="password"
              autocomplete="confirm-password"
              required
              class={t.input}
            />
            <FieldErrorMessage message={form?.errors?.confirm_password} />
          </div>
        </div>

        <div>
          <button type="submit" class={t.full_button}>Register Account</button>
        </div>
      </form>
    </div>
  </div>
</div>
