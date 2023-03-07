<script>
  import { t, all } from "$lib/tailwind.js"
  export let formItem
  export let name
</script>

<div class="mx-auto max-w-screen-xl">
  <div class="overflow-hidden ">
    <div class="divide-y lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
      <form
        id="admin_form"
        class="divide-y divide-gray-200 lg:col-span-9"
        action={formItem.id ? "?/update" : "?/create"}
        method="POST"
      >
        <div class="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 class="text-lg font-medium leading-6 text-gray-900">
              {formItem.id ? "Edit" : "New"}
              {name}
            </h2>
          </div>

          {#if formItem.id}
            <input type="hidden" name="id" value={formItem.id} />
          {/if}

          <slot />
        </div>

        <div class="mt-4 flex justify-end py-4 px-4 sm:px-6">
          <button
            on:click={() => {
              window.location.reload()
            }}
            type="button"
            class={t.cancel_button}>Cancel</button
          >

          <slot name="save_button">
            <button type="submit" class={all(t.blue_button, "ml-4")}
              >Save</button
            >
          </slot>
        </div>
      </form>
    </div>
  </div>
</div>
