<script setup lang="ts">
import { supabase } from '../lib/supabase.ts';
import { onMounted, ref } from 'vue';
import { Transaction } from '../types/transaction.ts';
const response = ref<Transaction[]>([]);
const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from('transaction')
      .select(`
      entry,
      type,
      category,
      amount,
      description,
      created_at
    `, { count: 'exact' });

    response.value = data;
  } catch (error) {
    console.log(error.message);
  }
}

onMounted(() => {
  fetchData();
})
</script>

<template>
  <div class="table-container p-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="m-0" style="font-size: 1.25rem; font-weight: bold;">All Transactions</h5>
    </div>
    <div class="overflow-auto">
      <div class="table-wrapper">
        <table class="table table-bordered caption-top">
          <thead>
            <tr>
              <th>Entry</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody v-if="response.length > 0" class="table-group-divider">
            <tr v-for="entry in response" :key="entry">
              <td>{{ entry.entry }}</td>
              <td>{{ entry.type }}</td>
              <td>{{ entry.category }}</td>
              <td>{{ entry.amount }}</td>
              <td>{{ entry.description }}</td>
              <td>{{ entry.created_at }}</td>
            </tr>
          </tbody>
          <tbody v-else class="table-group-divider">
            <tr>No entries added yet.</tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<style scoped>
.table-wrapper {
  max-height: 600px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .table-wrapper {
    max-height: 400px;
  }
}

@media (max-width: 480px) {
  .table-wrapper {
    max-height: 300px;
  }
}

thead th {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}
</style>
