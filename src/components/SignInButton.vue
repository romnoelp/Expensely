<script setup lang="ts">
import { Chrome } from 'lucide-vue-next'
import { supabase } from '../lib/supabase.ts'

// Handles Google OAuth using supabase's OAuth feature.
// It then redirects the user to the provided URL after authentication.
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:5173/',
    },
  })

  if (error) {
    console.error('Error: ', error.message)
  }

  console.error('Authentication successful.')
}
</script>

<template>
  <button
    @click="signInWithGoogle"
    class="mt-4 btn btn-primary btn-lg d-flex align-items-center gap-2"
  >
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
