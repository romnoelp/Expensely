<script setup lang="ts">
import { supabase } from '../lib/supabase.ts';
import { onMounted, ref } from 'vue';
import { Transaction } from '../types/transaction.ts';

const response = ref<Transaction[]>([]);
const selectedEntry = ref<Transaction | null>(null);
const showModal = ref(false);
const editForm = ref({
  type: '',
  category: '',
  amount: 0,
  description: ''
});

const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from('transaction')
      .select('entry, type, category, amount, description, created_at');

    if (error) throw error;

    response.value = data;
  } catch (error: any) {
    console.error(error.message);
  }
};

const openModal = (entry: Transaction) => {
  selectedEntry.value = entry;
  editForm.value = {
    type: entry.type,
    category: entry.category,
    amount: entry.amount,
    description: entry.description
  };
  showModal.value = true;
};

const updateEntry = async () => {
  if (!selectedEntry.value) return;

  const { error } = await supabase
    .from('transaction')
    .update({
      type: editForm.value.type,
      category: editForm.value.category,
      amount: editForm.value.amount,
      description: editForm.value.description
    })
    .eq('entry', selectedEntry.value.entry);

  if (error) {
    console.error(error.message);
  } else {
    await fetchData();
    showModal.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="table-container p-3">
    <h5 class="mb-3 fw-bold" style="font-size: 1.25rem;">All Transactions</h5>

    <div class="overflow-auto">
      <div class="table-wrapper">
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
            <tr v-for="entry in response" :key="entry.entry" @click="openModal(entry)" style="cursor: pointer;">
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
    </div>

    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header bg-light border-0 rounded-top-4">
            <h5 class="modal-title fw-bold">Edit Entry</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>

          <div class="modal-body p-4">
            <form @submit.prevent="updateEntry">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="typeEdit" class="form-label">Type</label>
                  <input type="text" id="typeEdit" class="form-control rounded-3" v-model="editForm.type" />
                </div>
                <div class="col-md-6">
                  <label for="categoryEdit" class="form-label">Category</label>
                  <input type="text" id="categoryEdit" class="form-control rounded-3" v-model="editForm.category" />
                </div>
                <div class="col-md-6">
                  <label for="amountEdit" class="form-label">Amount</label>
                  <input type="number" id="amountEdit" class="form-control rounded-3"
                    v-model.number="editForm.amount" />
                </div>
                <div class="col-12">
                  <label for="descriptionEdit" class="form-label">Description</label>
                  <textarea id="descriptionEdit" class="form-control rounded-3" v-model="editForm.description"
                    rows="3"></textarea>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer bg-light border-0 rounded-bottom-4 d-flex justify-content-end px-4 py-3">
            <button type="button" class="btn btn-outline-secondary me-2" @click="showModal = false">Cancel</button>
            <button type="button" class="btn btn-primary px-4" @click="updateEntry">Save Changes</button>
          </div>
        </div>
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

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
