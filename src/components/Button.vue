<template>
  <button
    type="submit"
    class="
      py-2
      px-6
      rounded-sm
      self-start
      text-sm text-white
      bg-at-light-green
      duration-200
      border-solid border-2 border-transparent
      hover:border-at-light-green hover:bg-white hover:text-at-light-green
      disabled:opacity-50
      disabled:bg-at-light-green
      disabled:text-white
      disabled:cursor-not-allowed
    "
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'button',
  props: {
    text: String,
  },
});
</script>

<style></style>
