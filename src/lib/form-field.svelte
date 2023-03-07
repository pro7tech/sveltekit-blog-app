<script>
  import { t } from "$lib/tailwind.js"
  export let label
  export let name
</script>

<div class="mt-6 grid grid-cols-12 gap-6">
  <div class="col-span-12">
    <label for={name} class={t.label}>{label}</label>
    <slot />
  </div>
</div>
