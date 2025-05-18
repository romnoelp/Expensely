<script setup lang="ts">
import { LayoutDashboard, BadgeRussianRuble, LogOut, HandCoins } from 'lucide-vue-next';
</script>

<template>
  <div>
    <nav class="navbar fixed-top" style="background-color: var(--color-primary);">
      <div class="container-fluid">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <HandCoins class="logo-icon" />
          <a class="navbar-brand" style="color: var(--color-neutral-light); font-size: 1.5rem; font-weight: bold;"
            href="#">Expensely</a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"
                  style="font-size: 1.1rem; padding-top: 0.75rem; padding-bottom: 0.75rem;">
                  <LayoutDashboard class="align-middle me-2" style="width: 20px; height: 20px;" /> Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="font-size: 1.1rem; padding-top: 0.75rem; padding-bottom: 0.75rem;">
                  <BadgeRussianRuble class="align-middle me-2" style="width: 20px; height: 20px;" /> Transactions
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style="font-size: 1.1rem; padding-top: 0.75rem; padding-bottom: 0.75rem;">
                  <LogOut class="align-middle me-2" style="width: 20px; height: 20px;" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <main class="main-container pt-5">
      <div class="p-3">
        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: bold;">Dashboard</h1>

        <div class="d-flex flex-wrap gap-3 mb-4">
          <div class="card flex-grow-1" style="min-width: 250px;">
            <div class="card-body d-flex flex-column align-items-center" style="padding: 1.5rem;">
              <h5 class="card-title align-self-start"
                style="font-size: 1rem; font-weight: normal; margin-bottom: 0.5rem;">Total Balance</h5>
              <h1 class="align-self-center value" style="margin-top: 0.75rem; font-size: 3rem;">₱1,000.00</h1>
            </div>
          </div>
          <div class="card flex-grow-1" style="min-width: 250px;">
            <div class="card-body d-flex flex-column align-items-center" style="padding: 1.5rem;">
              <h5 class="card-title align-self-start"
                style="font-size: 1rem; font-weight: normal; margin-bottom: 0.5rem;">Total Income</h5>
              <h1 class="align-self-center value" style="margin-top: 0.75rem; font-size: 3rem;">₱1,000.00</h1>
            </div>
          </div>
          <div class="card flex-grow-1" style="min-width: 250px;">
            <div class="card-body d-flex flex-column align-items-center" style="padding: 1.5rem;">
              <h5 class="card-title align-self-start"
                style="font-size: 1rem; font-weight: normal; margin-bottom: 0.5rem;">Total Expenses</h5>
              <h1 class="align-self-center value" style="margin-top: 0.75rem; font-size: 3rem;">₱1,000.00</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="table-container p-3">
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
            <tbody class="table-group-divider">
              <tr>
                <th scope="row" style="padding: 0.75rem;">April Salary</th>
                <td style="padding: 0.75rem;">Income</td>
                <td style="padding: 0.75rem;">Salary</td>
                <td style="padding: 0.75rem;">₱150,000.00</td>
                <td style="padding: 0.75rem;">Monthly salary from Acme Corp</td>
                <td style="padding: 0.75rem;">2025-05-01</td>
              </tr>
              <tr>
                <th scope="row" style="padding: 0.75rem;">Grocery Run</th>
                <td style="padding: 0.75rem;">Expense</td>
                <td style="padding: 0.75rem;">Groceries</td>
                <td style="padding: 0.75rem;">₱6,022.50</td>
                <td style="padding: 0.75rem;">Weekly groceries at local market</td>
                <td style="padding: 0.75rem;">2025-05-02</td>
              </tr>
              <tr>
                <th scope="row" style="padding: 0.75rem;">Gas Refill</th>
                <td style="padding: 0.75rem;">Expense</td>
                <td style="padding: 0.75rem;">Transport</td>
                <td style="padding: 0.75rem;">₱2,250.00</td>
                <td style="padding: 0.75rem;">Filled tank at local gas station</td>
                <td style="padding: 0.75rem;">2025-05-03</td>
              </tr>
              <tr>
                <th scope="row" style="padding: 0.75rem;">Logo Design</th>
                <td style="padding: 0.75rem;">Income</td>
                <td style="padding: 0.75rem;">Freelance</td>
                <td style="padding: 0.75rem;">₱25,000.00</td>
                <td style="padding: 0.75rem;">Freelance logo project for local café</td>
                <td style="padding: 0.75rem;">2025-05-05</td>
              </tr>
              <tr>
                <th scope="row" style="padding: 0.75rem;">Gym Membership</th>
                <td style="padding: 0.75rem;">Expense</td>
                <td style="padding: 0.75rem;">Fitness</td>
                <td style="padding: 0.75rem;">₱1,999.50</td>
                <td style="padding: 0.75rem;">Monthly gym subscription</td>
                <td style="padding: 0.75rem;">2025-05-06</td>
              </tr>
              <tr>
                <th scope="row" style="padding: 0.75rem;">Netflix Bill</th>
                <td style="padding: 0.75rem;">Expense</td>
                <td style="padding: 0.75rem;">Entertainment</td>
                <td style="padding: 0.75rem;">₱799.50</td>
                <td style="padding: 0.75rem;">Streaming service monthly payment</td>
                <td style="padding: 0.75rem;">2025-05-08</td>
              </tr>
              <tr>
                <th scope="row" style="padding: 0.75rem;">Dinner Out</th>
                <td style="padding: 0.75rem;">Expense</td>
                <td style="padding: 0.75rem;">Dining</td>
                <td style="padding: 0.75rem;">₱4,250.00</td>
                <td style="padding: 0.75rem;">Dinner with friends at local restaurant</td>
                <td style="padding: 0.75rem;">2025-05-10</td>
              </tr>
            </tbody>
          </table>
        </div>
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
