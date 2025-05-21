<script setup lang="ts">
import { LayoutDashboard, BadgeRussianRuble, LogOut, HandCoins } from 'lucide-vue-next'
import AllTransactions from '../components/AllTransaction.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />

    <main class="main-container pt-5">
      <div class="p-3">
        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: bold">Transactions</h1>
      </div>
      <AllTransactions />
    </main>
  </div>
</template>

<style scoped>
* {
  color: var(--color-neutral-dark);
}

.value {
  margin-top: 0.75rem;
  font-size: 3rem;
}

.main-container {
  padding-top: 80px !important;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
}

@media (min-width: 768px) {
  .main-container {
    padding-left: 50px;
    padding-right: 50px;
  }
}

.logo-icon {
  color: var(--color-neutral-light);
  width: 24px;
  height: 24px;
}

.navbar-toggler {
  border-color: var(--color-neutral-light);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23f8f9fa' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.table th,
.table td {
  color: var(--color-neutral-dark);
  padding: 0.75rem;
}

h1,
h2,
h3,
h4,
h5 {
  color: var(--color-neutral-dark);
}

.card-title {
  color: var(--color-neutral-dark);
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}

.card-body h1 {
  color: var(--color-neutral-dark);
  font-size: 3rem;
  margin-top: 0.75rem;
}
</style>
