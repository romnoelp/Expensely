<script setup lang="ts">
import { Chrome } from 'lucide-vue-next';
</script>

<template>
  <button class="mt-4 btn btn-primary btn-lg d-flex align-items-center gap-2">
    <Chrome class="btn-icon" />
    Sign in with Google
  </button>
</template>

<style scoped>
.btn {
  background-color: var(--color-primary);
  border: none;
}

.btn-icon {
  color: var(--color-neutral-light);
  width: 20px;
  height: 20px;
}
</style>
