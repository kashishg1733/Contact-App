<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">{{title}}</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav nav nav-pills">
      <router-link class="nav-item nav-link" to = "/" extra-active-class = "active">Home</router-link>
      <router-link class="nav-item nav-link" to="create-contact" extra-active-class = "active">Create Contact</router-link>
    </div>
  </div>
</nav>
</template>

<script setup>
    const props = defineProps({
        title: String,
        required: true
    })
</script>
