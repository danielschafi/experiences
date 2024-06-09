<template>
  <div class="min-h-screen ">
    <Header/>
    <NuxtPage />
    <slot />
    <Footer class="absolute "</Footer>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
      middleware: "auth"
  })
</script>

<style>

</style>