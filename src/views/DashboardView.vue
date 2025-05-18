<script setup lang="ts">
import { LayoutDashboard, BadgeRussianRuble, LogOut, HandCoins } from 'lucide-vue-next';
</script>

<template>
  <nav class="navbar fixed-top" style="background-color: var(--color-primary);">
    <div class="container-fluid">
      <div class="d-flex justify-content-center align-items-center gap-2">
        <HandCoins class="logo-icon" />
        <a class="navbar-brand" style="color: var(--color-neutral-light);" href="#">Expensely</a>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <LayoutDashboard /> Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <BadgeRussianRuble /> Transactions
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <LogOut /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo-icon {
  color: var(--color-neutral-light);
  width: 24px;
  height: 24px;
}
</style>
