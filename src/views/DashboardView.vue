<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import RecentTransactions from '../components/RecentTransaction.vue';
import { supabase } from '../lib/supabase.ts';

const totalIncome = ref(0);
const totalExpenses = ref(0);
const totalBalance = computed(() => totalIncome.value - totalExpenses.value);

const fetchTotals = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('transaction')
      .select('type, amount')
      .eq('user_id', user.id);

    if (error) throw error;

    if (data) {
      totalIncome.value = data
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      totalExpenses.value = data
        .filter(t => t.type.toLowerCase() === 'expense')

        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    }
  } catch (error: any) {
    console.error('Error fetching totals:', error.message);
  }
};

onMounted(() => {
  fetchTotals();
});
</script>


<template>
  <div>
    <Navbar />

    <main class="main-container pt-5">
      <div class="p-3">
        <h1 class="mb-4" style="font-size: 2.5rem; font-weight: bold;">Dashboard</h1>

        <div class="d-flex flex-wrap gap-3 mb-4">
          <div class="card flex-grow-1" style="min-width: 250px;">
            <div class="card-body d-flex flex-column align-items-center" style="padding: 1.5rem;">
              <h5 class="card-title align-self-start">Total Balance</h5>
              <h1 class="align-self-center value">₱{{ totalBalance.toFixed(2) }}</h1>
            </div>
          </div>

          <div class="card flex-grow-1" style="min-width: 250px;">
            <div class="card-body d-flex flex-column align-items-center" style="padding: 1.5rem;">
              <h5 class="card-title align-self-start">Total Income</h5>
              <h1 class="align-self-center value">₱{{ totalIncome.toFixed(2) }}</h1>
            </div>
          </div>

          <div class="card flex-grow-1" style="min-width: 250px;">
            <div class="card-body d-flex flex-column align-items-center" style="padding: 1.5rem;">
              <h5 class="card-title align-self-start">Total Expenses</h5>
              <h1 class="align-self-center value">₱{{ totalExpenses.toFixed(2) }}</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="table-container p-3">
        <RecentTransactions />
      </div>
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
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}

.card-body h1 {
  font-size: 3rem;
  margin-top: 0.75rem;
}
</style>
