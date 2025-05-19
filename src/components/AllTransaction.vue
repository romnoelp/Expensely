<script setup lang="ts">

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
          <tbody>
            <tr>
              <th scope="row">April Salary</th>
              <td>Income</td>
              <td>Salary</td>
              <td>₱150,000.00</td>
              <td>Monthly salary from Acme Corp</td>
              <td>2025-05-01</td>
            </tr>
            <tr>
              <th scope="row">Grocery Run</th>
              <td>Expense</td>
              <td>Groceries</td>
              <td>₱6,022.50</td>
              <td>Weekly groceries at local market</td>
              <td>2025-05-02</td>
            </tr>
            <tr>
              <th scope="row">Gas Refill</th>
              <td>Expense</td>
              <td>Transport</td>
              <td>₱2,250.00</td>
              <td>Filled tank at local gas station</td>
              <td>2025-05-03</td>
            </tr>
            <tr>
              <th scope="row">Logo Design</th>
              <td>Income</td>
              <td>Freelance</td>
              <td>₱25,000.00</td>
              <td>Freelance logo project for local café</td>
              <td>2025-05-05</td>
            </tr>
            <tr>
              <th scope="row">Gym Membership</th>
              <td>Expense</td>
              <td>Fitness</td>
              <td>₱1,999.50</td>
              <td>Monthly gym subscription</td>
              <td>2025-05-06</td>
            </tr>
            <tr>
              <th scope="row">Netflix Bill</th>
              <td>Expense</td>
              <td>Entertainment</td>
              <td>₱799.50</td>
              <td>Streaming service monthly payment</td>
              <td>2025-05-08</td>
            </tr>
            <tr>
              <th scope="row">Dinner Out</th>
              <td>Expense</td>
              <td>Dining</td>
              <td>₱4,250.00</td>
              <td>Dinner with friends at local restaurant</td>
              <td>2025-05-10</td>
            </tr>
            <!-- Extra rows for testing scroll -->
            <tr>
              <th scope="row">Water Bill</th>
              <td>Expense</td>
              <td>Utilities</td>
              <td>₱500.00</td>
              <td>Monthly water bill</td>
              <td>2025-05-11</td>
            </tr>
            <tr>
              <th scope="row">Internet Bill</th>
              <td>Expense</td>
              <td>Utilities</td>
              <td>₱1,299.00</td>
              <td>Monthly internet</td>
              <td>2025-05-12</td>
            </tr>
            <tr>
              <th scope="row">Electricity Bill</th>
              <td>Expense</td>
              <td>Utilities</td>
              <td>₱2,000.00</td>
              <td>Monthly electricity</td>
              <td>2025-05-13</td>
            </tr>
            <tr>
              <th scope="row">Coffee</th>
              <td>Expense</td>
              <td>Dining</td>
              <td>₱250.00</td>
              <td>Coffee at café</td>
              <td>2025-05-14</td>
            </tr>
            <tr>
              <th scope="row">Shoes</th>
              <td>Expense</td>
              <td>Shopping</td>
              <td>₱3,000.00</td>
              <td>New sneakers</td>
              <td>2025-05-15</td>
            </tr>
            <tr>
              <th scope="row">Book Sale</th>
              <td>Income</td>
              <td>Freelance</td>
              <td>₱1,200.00</td>
              <td>Sold old books</td>
              <td>2025-05-16</td>
            </tr>
            <tr>
              <th scope="row">Donation</th>
              <td>Expense</td>
              <td>Charity</td>
              <td>₱1,000.00</td>
              <td>Local charity</td>
              <td>2025-05-17</td>
            </tr>
            <tr>
              <th scope="row">Game Purchase</th>
              <td>Expense</td>
              <td>Entertainment</td>
              <td>₱2,500.00</td>
              <td>New PC game</td>
              <td>2025-05-18</td>
            </tr>
            <tr>
              <th scope="row">Lunch</th>
              <td>Expense</td>
              <td>Dining</td>
              <td>₱320.00</td>
              <td>Quick lunch</td>
              <td>2025-05-19</td>
            </tr>
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
