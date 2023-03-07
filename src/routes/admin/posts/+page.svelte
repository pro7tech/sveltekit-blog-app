<script>
  // @ts-nocheck
  import FormMessage from "$lib/form-message.svelte"
  import { t, all } from "$lib/tailwind.js"
  import AdminPage from "$lib/admin/page.svelte"
  import FormField from "$lib/form-field.svelte"
  import AdminForm from "$lib/admin/form.svelte"
  import "quill/dist/quill.snow.css"

  import { onMount } from "svelte"

  export let data
  let dbData = data.items
  let formItem = null

  /** @type {import('./$types').ActionData} */
  export let form

  if (form?.error) {
    formItem = form.form
  }

  let setEmptyFormItem = () => {
    formItem = {
      title: "",
      slug: "",
      content: "",
    }
  }
  setEmptyFormItem()

  let showForm = false

  let hasTag = (formItem, tag) => {
    return formItem?.tags?.find((t) => t.id == tag.id)
  }

  let editor

  export let toolbarOptions = [
    [{ header: 1 }, { header: 2 }, "blockquote", "link"],
    ["bold", "italic", "underline"],
    ["clean"],
  ]

  let quill

  let getContentString = (str) => {
    if (str.length > 50) {
      str = str.slice(0, 50) + "..."
    }

    return str
  }

  onMount(async () => {
    const { default: Quill } = await import("quill")

    quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
      placeholder: "Write your post...",
    })
  })
</script>

<FormMessage {form} />

<!--  Quill needs editor-wrapper div in DOM during initialization. Using an #if block would not create the DOM.
-->

<div class={showForm ? "" : "hidden"}>
  <AdminForm {formItem} name="Post">
    <FormField label="Title" name="title">
      <input type="text" name="title" value={formItem.title} class={t.input} />
    </FormField>

    <FormField label="Slug" name="slug">
      <input
        on:focus={(e) => {
          let title = e.target.form.title.value
          let convertTitleToSlug = (title) => {
            return title
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[^\w-]+/g, "")
          }

          if (e.target.value == "") {
            e.target.value = convertTitleToSlug(title)
          }
        }}
        type="text"
        name="slug"
        value={formItem.slug || ""}
        class={t.input}
      />
    </FormField>
    <FormField label="Content" name="content">
      <div class="editor-wrapper">
        <div bind:this={editor} />
      </div>
      <textarea class="hidden" id="content" name="content" />
      <input type="text" id="snippet" class="hidden" name="snippet" />
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

    <FormField label="Tags" name="tags">
      <select name="tags" multiple class={t.input}>
        {#each data.tags as tag}
          <option value={tag.id} selected={hasTag(formItem, tag)}
            >{tag.name}</option
          >
        {/each}
      </select>
    </FormField>

    <FormField label="Image" name="image_src">
      <input
        type="text"
        name="image_src"
        value={formItem.image_src || ""}
        class={t.input}
      />
    </FormField>

    <button
      slot="save_button"
      type="button"
      on:click={() => {
        document.getElementById("content").value = quill.root.innerHTML
        document.getElementById("snippet").value = quill.getText().slice(0, 300)
        document.getElementById("admin_form").submit()
      }}
      class={all(t.blue_button, "ml-4")}>Save</button
    >
  </AdminForm>
</div>

<AdminPage title="Posts" description="Manage posts">
  <button
    on:click={() => {
      setEmptyFormItem()
      showForm = true
    }}
    slot="add_button"
    type="button"
    class={t.blue_button}>New Post</button
  >
  <thead class="bg-gray-100" slot="thead">
    <tr>
      <th class={t.first_header_column}>Title</th>
      <th class={t.header_column}>Author</th>
      <th class={t.header_column_wrap}>Tags</th>
      <th class={t.header_column}>Image</th>
      <th class={t.header_column} />
    </tr>
  </thead>
  <tbody class="bg-white" slot="tbody">
    {#each dbData as item, i}
      <tr class={i % 2 == 0 ? "" : "bg-gray-50"}>
        <td class={t.first_tbody_column}>{item.title}</td>
        <td class={t.tbody_column}><img src={item.author.avatar_src} class="rounded-full" alt="" width="35" /></td>
        <td class={t.tbody_column_wrap}>
          {#each item.tags as tag, i}
            {tag.name}{i < item.tags.length - 1 ? ", " : ""}
          {/each} 
        </td>
        <td class={t.tbody_column}>
          {#if item.image_src}
            <img src={item.image_src} alt="" width="100" />
          {/if}
        </td>

        <td class={t.tbody_action_column}>
          <a
            on:click={() => {
              var delta = quill.clipboard.convert(item.content)
              quill.setContents(delta)
              showForm = true
              formItem = item
            }}
            href="#"
            class={t.blue_button}>Edit</a
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
