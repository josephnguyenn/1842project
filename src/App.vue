<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>


<style>
/* Basic styles for the navigation bar */
nav {
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #007bff;
  font-size: 1.1rem;
}

nav a:hover {
  text-decoration: underline;
}
</style>
