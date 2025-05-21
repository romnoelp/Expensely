<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { supabase } from '../lib/supabase.ts';
import Transaction from '../types/transaction.ts';
import * as bootstrap from 'bootstrap';

const response = ref<Transaction[]>([]);
const newEntry = ref({
  entry: '',
  type: '',
  category: '',
  amount: 0,
  description: ''
});

const fetchData = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('transaction')
      .select('entry, type, category, amount, description, created_at')
      .order('id', { ascending: false })
      .limit(8);

    if (error) throw error;
    response.value = data as Transaction[];
  } catch (error: any) {
    console.error(error.message);
  }
};

const addEntry = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Failed to get user.');

    const { error } = await supabase.from('transaction').insert([{
      ...newEntry.value,
      user_id: user.id
    }]);
    if (error) throw error;

    await fetchData();

    const modalEl = document.getElementById('addEntryModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();
    }

    newEntry.value = {
      entry: '',
      type: '',
      category: '',
      amount: 0,
      description: ''
    };

    const toast = document.getElementById('entryToast');
    if (toast) new bootstrap.Toast(toast, { delay: 3000, autohide: true }).show();

  } catch (error: any) {
    console.error(error.message);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="m-0 fw-bold" style="font-size: 1.25rem;">Recent Transactions</h5>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEntryModal">
      Add Entry
    </button>
  </div>

  <div class="overflow-auto">
    <table class="table table-bordered caption-top">
      <thead class="table-light">
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
        <tr v-for="entry in response" :key="entry.entry">
          <td>{{ entry.entry }}</td>
          <td>{{ entry.type }}</td>
          <td>{{ entry.category }}</td>
          <td>₱{{ entry.amount }}</td>
          <td>{{ entry.description }}</td>
          <td>{{ new Date(entry.created_at).toLocaleDateString() }}</td>
        </tr>
      </tbody>
      <tbody v-else class="table-group-divider">
        <tr>
          <td colspan="6" class="text-center">No entries added yet.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Add Entry Modal -->
  <div class="modal fade" id="addEntryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0 shadow rounded-4">
        <div class="modal-header bg-light border-0 rounded-top-4">
          <h5 class="modal-title fw-bold">Add New Entry</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body p-4">
          <form @submit.prevent="addEntry">
            <div class="mb-3">
              <label class="form-label">Entry</label>
              <input type="text" class="form-control" v-model="newEntry.entry" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Type</label>
              <select class="form-select" v-model="newEntry.type" required>
                <option disabled value="">Select type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Category</label>
              <input type="text" class="form-control" v-model="newEntry.category" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Amount</label>
              <input type="number" class="form-control" v-model.number="newEntry.amount" min="0.01" step="0.01"
                required />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" v-model="newEntry.description" rows="3"></textarea>
            </div>
            <div class="modal-footer px-0">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary px-4">Add Entry</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1200;">
    <div id="entryToast" class="toast align-items-center text-white bg-success border-0" role="alert"
      aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
      <div class="d-flex">
        <div class="toast-body">
          Entry added successfully!
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
          aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
thead th {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}
</style>
