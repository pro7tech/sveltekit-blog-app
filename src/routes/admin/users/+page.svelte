<script>
  // @ts-nocheck
  import FormMessage from "$lib/form-message.svelte"
  import { all, t } from "$lib/tailwind.js"

  import AdminPage from "$lib/admin/page.svelte"
  import FormField from "$lib/form-field.svelte"
  import AdminForm from "$lib/admin/form.svelte"

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
    <FormField label="Username" name="username">
      <input
        type="text"
        name="username"
        value={formItem.username}
        class={t.input}
      />
    </FormField>

    <FormField label="First Name" name="first_name">
      <input
        type="text"
        name="first_name"
        value={formItem.first_name}
        class={t.input}
      />
    </FormField>

    <FormField label="Last Name" name="last_name">
      <input
        type="text"
        name="last_name"
        value={formItem.last_name}
        class={t.input}
      />
    </FormField>

    <FormField label="Email" name="email">
      <input type="text" name="email" value={formItem.email} class={t.input} />
    </FormField>

    <FormField label="Avatar" name="avatar_src">
      <input
        type="text"
        name="avatar_src"
        value={formItem.avatar_src}
        class={t.input}
      />
    </FormField>

    <FormField label="Role" name="role">
      <select name="role" class={t.input}>
        <option value="user" selected={formItem.role == "user"}>User</option>
        <option value="admin" selected={formItem.role == "admin"}>Admin</option>
      </select>
    </FormField>
  </AdminForm>
{/if}

<AdminPage title="Users" description="Manage users">
  <button
    on:click={() =>
      (formItem = {
        id: null,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        avatar_src: "",
        role: "user",
      })}
    slot="add_button"
    type="button"
    class={t.blue_button}>New User</button
  >
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Username</th>
      <th class={t.header_column}>First Name</th>
      <th class={t.header_column}>Last Name</th>
      <th class={t.header_column}>Email</th>
      <th class={t.header_column}>Avatar</th>
      <th class={t.header_column}>Role</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{item.username}</td>
        <td class={t.tbody_column}>{item.first_name || ""}</td>
        <td class={t.tbody_column}>{item.last_name || ""}</td>
        <td class={t.tbody_column}>{item.email}</td>
        <td class={t.tbody_column}
          ><img src={item.avatar_src} class="rounded-full" alt="" width="35" /></td
        >
        <td class={t.tbody_column}>{item.role}</td>

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
