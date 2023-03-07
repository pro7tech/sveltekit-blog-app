<script>
  import FormMessage from "$lib/form-message.svelte"
  import { t } from "$lib/tailwind.js"
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
  <AdminForm {formItem} name="Comment">
    <FormField label="Title" name="post">
      <select name="post" class={t.input}>
        {#each data.posts as post}
          <option selected={formItem?.post?.id == post.id} value={post.id}
            >{post.title}</option
          >
        {/each}
      </select>
    </FormField>

    <FormField label="Content" name="content">
      <textarea
        name="content"
        value={formItem.content}
        rows="4"
        class={t.input}
        placeholder=""
      />
    </FormField>

    <FormField label="Author" name="author">
      <select name="author" class={t.input}>
        {#each data.users as user}
          <option selected={formItem?.author?.id == user.id} value={user.id}
            >{user.username}</option
          >
        {/each}
      </select>
    </FormField>
  </AdminForm>
{/if}

<AdminPage title="Comments" description="Manage comments">
  <button
    on:click={() => (formItem = { id: null, content: "" })}
    slot="add_button"
    type="button"
    class={t.blue_button}>New Comment</button
  >
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Post</th>
      <th class={t.header_column}>Comment</th>
      <th class={t.header_column}>Author</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{item.post.title}</td>
        <td class={t.tbody_column_wrap}>{item.content}</td>
        <td class={t.tbody_column}><img src={item.author.avatar_src} class="rounded-full" alt="" width="35" /></td>
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
