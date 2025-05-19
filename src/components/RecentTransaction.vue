<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { supabase } from '../lib/supabase.ts';
import Transaction from '../types/transaction.ts';


let response = ref<Transaction[]>([]);
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
    `)
      .limit(8);

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
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="m-0" style="font-size: 1.25rem; font-weight: bold;">Recent Transactions</h5>
    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 1rem;">Add Entry</button>
  </div>

  <div class="overflow-auto">
    <table class="table table-bordered caption-top">
      <thead>
        <tr>
          <th scope="col" style="padding: 0.75rem;">Entry</th>
          <th scope="col" style="padding: 0.75rem;">Type</th>
          <th scope="col" style="padding: 0.75rem;">Category</th>
          <th scope="col" style="padding: 0.75rem;">Amount</th>
          <th scope="col" style="padding: 0.75rem;">Description</th>
          <th scope="col" style="padding: 0.75rem;">Date Added</th>
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

</template>

<style scoped></style>
