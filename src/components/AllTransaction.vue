<script setup lang="ts">
import { supabase } from '../lib/supabase.ts';
import { onMounted, ref, nextTick } from 'vue';
import { Transaction } from '../types/transaction.ts';
import * as bootstrap from 'bootstrap';

const response = ref<Transaction[]>([]);
const selectedEntry = ref<Transaction | null>(null);
const showModal = ref(false);
const showActionPopup = ref(false);
const shownTooltips = ref(new Set<string>());
const editForm = ref({
  type: '',
  category: '',
  amount: 0,
  description: ''
});

const fetchData = async () => {
  const session = await supabase.auth.getUser();

  const user = session?.data?.user;
  const userError = session?.error;

  if (!user || userError) {
    console.error("User not logged in or error getting user:", userError?.message);
    return;
  }

  const query = supabase
    .from('transaction')
    .select('entry, type, category, amount, description, created_at')
    .eq('user_id', user.id);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching transactions:", error.message);
    return;
  }

  response.value = data || [];

  console.log("Fetched transactions:", response.value); // 🔍 Debug
  await nextTick();
  setupTooltips();
};


const setupTooltips = () => {
  response.value.forEach((item) => {
    const tooltipId = `tooltip-${item.entry}`;
    const el = document.getElementById(tooltipId);
    if (el && !shownTooltips.value.has(item.entry)) {
      const tooltip = new bootstrap.Tooltip(el, {
        trigger: 'hover',
        title: 'Click to update or delete',
        delay: { show: 200, hide: 0 },
      });

      el.addEventListener('shown.bs.tooltip', () => {
        shownTooltips.value.add(item.entry);
        tooltip.dispose();
      });
    }
  });
};

const openActionPopup = (entry: Transaction) => {
  selectedEntry.value = entry;
  showActionPopup.value = true;
};

const closeActionPopup = () => {
  showActionPopup.value = false;
  selectedEntry.value = null;
};

const openModal = () => {
  if (!selectedEntry.value) return;

  editForm.value = {
    type: selectedEntry.value.type || '',
    category: selectedEntry.value.category || '',
    amount: selectedEntry.value.amount || 0,
    description: selectedEntry.value.description || ''
  };
  showModal.value = true;
  showActionPopup.value = false;
};

const closeEditModal = () => {
  showModal.value = false;
  selectedEntry.value = null;
};

const updateEntry = async () => {
  if (!selectedEntry.value?.entry) {
    console.error("Update failed: No selected entry.");
    return;
  }

  try {
    const { error } = await supabase
      .from('transaction')
      .update({
        type: editForm.value.type,
        category: editForm.value.category,
        amount: editForm.value.amount,
        description: editForm.value.description
      })
      .eq('entry', selectedEntry.value.entry);

    if (error) throw error;

    await fetchData();
    showModal.value = false;
    selectedEntry.value = null;

    const toastEl = document.getElementById('updateSuccessToast');
    if (toastEl) new bootstrap.Toast(toastEl, { delay: 3000 }).show();
  } catch (error: any) {
    console.error("Error updating entry:", error.message);
  }
};

const deleteEntry = async () => {
  if (!selectedEntry.value?.entry) {
    console.error("Delete failed: No selected entry.");
    return;
  }

  try {
    const { error } = await supabase
      .from('transaction')
      .delete()
      .eq('entry', selectedEntry.value.entry);
    if (error) throw error;

    await fetchData();
    closeActionPopup();

    const toastEl = document.getElementById('deleteSuccessToast');
    if (toastEl) new bootstrap.Toast(toastEl, { delay: 3000 }).show();
  } catch (error: any) {
    console.error("Error deleting entry:", error.message);
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
            <tr v-for="item in response" :key="item.entry" :id="'tooltip-' + item.entry" @click="openActionPopup(item)"
              style="cursor: pointer;" data-bs-toggle="tooltip" title="Click to update or delete">
              <td>{{ item.entry }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.category }}</td>
              <td>₱{{ item.amount }}</td>
              <td>{{ item.description }}</td>
              <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
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

    <!-- Action Popup Modal -->
    <div v-if="showActionPopup" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);"
      @click.self="closeActionPopup">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
          <div class="modal-header bg-light border-0 rounded-top-4">
            <h5 class="modal-title fw-bold">Choose Action</h5>
            <button type="button" class="btn-close" @click="closeActionPopup"></button>
          </div>
          <div class="modal-body p-4 text-center">
            <p>What do you want to do with this entry?</p>
            <button class="btn btn-primary me-3" @click="openModal">Update</button>
            <button class="btn btn-danger" @click="deleteEntry">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content border-0 shadow rounded-4">
          <div class="modal-header bg-light border-0 rounded-top-4">
            <h5 class="modal-title fw-bold">Edit Entry</h5>
            <button type="button" class="btn-close" @click="closeEditModal"></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="updateEntry">
              <div class="mb-3">
                <label for="typeEdit" class="form-label">Type</label>
                <select id="typeEdit" class="form-select" v-model="editForm.type" required>
                  <option disabled value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="categoryEdit" class="form-label">Category</label>
                <input type="text" id="categoryEdit" class="form-control" v-model="editForm.category" required />
              </div>
              <div class="mb-3">
                <label for="amountEdit" class="form-label">Amount</label>
                <input type="number" id="amountEdit" class="form-control" v-model.number="editForm.amount" min="0.01"
                  step="0.01" required />
              </div>
              <div class="mb-3">
                <label for="descriptionEdit" class="form-label">Description</label>
                <textarea id="descriptionEdit" class="form-control" v-model="editForm.description" rows="3"></textarea>
              </div>
              <div class="modal-footer px-0 mt-4">
                <button type="button" class="btn btn-outline-secondary" @click="closeEditModal">Cancel</button>
                <button type="submit" class="btn btn-primary px-4">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Toasts -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1200;">
    <div id="deleteSuccessToast" class="toast align-items-center text-white bg-danger border-0" role="alert"
      aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">Entry deleted successfully!</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>

    <div id="updateSuccessToast" class="toast align-items-center text-white bg-success border-0" role="alert"
      aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">Entry updated successfully!</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
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

.modal-footer.px-0 {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
