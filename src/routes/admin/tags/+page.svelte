<script>
  import { all, t } from "$lib/tailwind.js"
  import FormMessage from "$lib/form-message.svelte"
  import AdminPage from "$lib/admin/page.svelte"
  import FormField from "$lib/form-field.svelte"
  import AdminForm from "$lib/admin/form.svelte"

  // @ts-nocheck
  export let data
  let dbData = data.items
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }
</script>

<FormMessage {form} />

{#if formItem}
  <AdminForm {formItem} name="Tag">
    <FormField label="Tag" name="name">
      <input type="text" name="name" value={formItem.name} class={t.input} />
    </FormField>
  </AdminForm>
{/if}

<AdminPage title="Tags" description="Manage tags">
  <button
    on:click={() => {
      formItem = { id: null, name: "" }
    }}
    slot="add_button"
    type="button"
    class={t.blue_button}>Add Tag</button
  >

  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Tag</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{item.name}</td>
        <td class={t.tbody_action_column}>
          <a on:click={() => (formItem = item)} href="#" class={t.blue_button}
            >Edit</a
          >
          <form action="?/delete" method="POST" class="inline">
            <input type="hidden" name="id" value={item.id} />
            <input type="submit" class={t.danger_button} value="Delete" />
          </form>
        </td>
      </tr>
    {/each}
  </tbody>
</AdminPage>
