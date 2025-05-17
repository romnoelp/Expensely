<script setup lang="ts">
import SignInButton from '../components/SignInButton.vue';
</script>

<template>
  <main class="d-flex flex-column align-items-center justify-content-center text-center min-vh-100 px-4"
    style="background-color: var(--color-neutral-light);">
    <h1 class="fw-bold display-4 mb-2" style="color: var(--color-primary);">Expensely</h1>
    <h3 class="fw-semibold fs-4 mb-3" style="color: var(--color-neutral-dark);">
      Your personal finance tracker
    </h3>
    <h4 class="fst-italic fs-6 mb-4" style="color: var(--color-neutral-dark); max-width: 32rem;">
      "Whatever can be <em>tracked</em>,<br />
      can be <em>improved</em>"
    </h4>
    <SignInButton class="mt-2" />
    <div class="mb-5"></div>
  </main>
</template>

<style scoped></style>
