<script>
  export let form
</script>

{#if form?.error}
  <div
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
  >
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">{form.error}</span>
  </div>
{/if}

{#if form?.success}
  <div
    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
  >
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">{form.success}</span>
  </div>
{/if}
