<script>
  import { t, all } from "$lib/tailwind.js"
  import FormMessage from "$lib/form-message.svelte"

  export let data
  export let form
  let user = data.user

  let first_name = user.first_name
  let last_name = user.last_name

  if (form?.error) {
    first_name = form.form.first_name
    last_name = form.form.last_name
  }
</script>

<form class="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
  <div class="py-6 px-4 sm:p-6 lg:pb-8">
    <FormMessage {form} />

    <div>
      <h2 class="text-lg font-medium leading-6 text-gray-900">Profile</h2>
      <p class="mt-1 text-sm text-gray-500">
        The username and email can only be changed by an admin.
      </p>
    </div>

    <div class="mt-6 grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <label for="url" class={t.label}>Username</label>
        <input
          type="text"
          readonly
          value={user.username}
          name="url"
          id="url"
          class={all(t.input, t.readonly)}
        />
      </div>

      <div class="col-span-12 sm:col-span-6">
        <label for="first-name" class={t.label}>First name</label>
        <input
          type="text"
          name="first_name"
          value={first_name}
          autocomplete="given-name"
          class={t.input}
        />
      </div>

      <div class="col-span-12 sm:col-span-6">
        <label for="last-name" class={t.label}>Last name</label>
        <input
          type="text"
          name="last_name"
          value={last_name}
          autocomplete="family-name"
          class={t.input}
        />
      </div>

      <div class="col-span-12">
        <label for="url" class={t.label}>Email</label>
        <input
          type="text"
          name="url"
          readonly
          value={user.email}
          id="url"
          class={all(t.input, t.readonly)}
        />
      </div>
    </div>

    <div class="divide-y divide-gray-200 pt-6">
      <div class="mt-4 flex justify-end py-4 px-4 sm:px-6">
        <button
          type="button"
          on:click={() => (window.location = "/user/settings")}
          class="{t.cancel_button}}">Cancel</button
        >
        <button type="submit" class={t.save_button}>Save</button>
      </div>
    </div>
  </div>
</form>
