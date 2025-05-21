<script setup lang="ts">
import { LayoutDashboard, BadgeRussianRuble, LogOut, HandCoins } from 'lucide-vue-next';
</script>

<template>
  <nav class="navbar fixed-top" style="background-color: var(--color-primary);">
    <div class="container-fluid">
      <div class="d-flex justify-content-center align-items-center gap-2">
        <HandCoins class="logo-icon" />
        <a class="navbar-brand" style="color: var(--color-neutral-light); font-size: 1.5rem; font-weight: bold;"
          href="/">Expensely</a>
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
              <a class="nav-link" :class="{ active: $route.path === '/' }" href="/">
                <LayoutDashboard class="align-middle me-2" style="width: 20px; height: 20px;" />
                Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: $route.path === '/transactions' }" href="/transactions">
                <BadgeRussianRuble class="align-middle me-2" style="width: 20px; height: 20px;" />
                Transactions
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <LogOut class="align-middle me-2" style="width: 20px; height: 20px;" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-icon {
  color: var(--color-neutral-light);
  width: 24px;
  height: 24px;
}

.navbar-toggler {
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 8px 10px;
  transition: background-color 0.3s ease;
}

.navbar-toggler:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='%23f8f9fa' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.offcanvas-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.offcanvas-title {
  font-weight: bold;
}

.nav-link {
  color: var(--color-text-dark);
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--color-primary);
}

.nav-link.active {
  background-color: var(--color-primary);
  color: var(--color-neutral-light);
  font-weight: bold;
}

.nav-link.active .lucide {
  color: var(--color-neutral-light);
}

.nav-link .lucide {
  color: var(--color-text-dark);
  transition: color 0.3s ease;
}
</style>
