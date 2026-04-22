<template>
  <a href="#main-content" class="skip-link">Aller au contenu principal</a>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: 0.5rem 1.25rem;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0 0 0.5rem 0.5rem;
  text-decoration: none;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #818cf8;
  outline-offset: 2px;
}
</style>
