<script setup lang="ts">
import SignInButton from '../components/SignInButton.vue';
</script>
<template>
  <main class="d-flex flex-column align-items-center justify-content-center">
    <h1 class="display-2 text-center">"Whatever can be <em>tracked</em>, <br /> can be <em>improved</em> "
    </h1>
    <h4 class="mt-4">Introducing <span class="brand">Expensely</span>, your personal finance tracker</h4>
    <SignInButton />
  </main>
</template>

<style scoped>
main {
  height: 100%;
  background-color: var(--color-neutral-light);
}

h1,
h4 {
  color: var(--color-neutral-dark);
}

.brand {
  color: var(--color-primary);
  font-weight: bolder;
}
</style>
