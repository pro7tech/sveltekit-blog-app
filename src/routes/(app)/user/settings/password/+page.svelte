<script>
  import { t } from "$lib/tailwind.js"
  import FormMessage from "$lib/form-message.svelte"
  import FieldErrorMessage from "$lib/field-error-message.svelte"

  export let form
</script>

<form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
  <div class="py-6 px-4 sm:p-6 lg:pb-8">
    <FormMessage {form} />

    <div>
      <h2 class="text-lg font-medium leading-6 text-gray-900">
        Change Password
      </h2>
      <p class="mt-1 text-sm text-gray-500">
        Use this form to update your password.
      </p>
    </div>

    <div class="mt-6 grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <label for="url" class={t.label}>Current Password</label>
        <input
          type="password"
          name="current_password"
          required
          class={t.input}
        />
        <FieldErrorMessage message={form?.errors?.current_password} />
      </div>

      <div class="col-span-12 sm:col-span-6">
        <label for="first_name" class={t.label}>New Password</label>
        <input type="password" name="password" required class={t.input} />
        <FieldErrorMessage message={form?.errors?.password} />
      </div>

      <div class="col-span-12 sm:col-span-6">
        <label for="last-name" class={t.label}>Confirm New Password</label>
        <input
          type="password"
          name="confirm_password"
          required
          class={t.input}
        />
        <FieldErrorMessage message={form?.errors?.confirm_password} />
      </div>
    </div>
  </div>

  <div class="divide-y divide-gray-200 pt-6">
    <div class="mt-4 flex justify-end py-4 px-4 sm:px-6">
      <button
        type="button"
        on:click={() => (window.location = "/user/settings/password")}
        class={t.cancel_button}>Cancel</button
      >
      <button type="submit" class={t.save_button}>Save</button>
    </div>
  </div>
</form>
