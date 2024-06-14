<template>
   <header class="text-white bg-emerald ">
      <h1 class="flex justify-center p-4 text-5xl font-semibold align-middle ">XPTogether</h1>
      <nav class="grid grid-cols-1 border-2 border-solid md:grid-cols-3 border-emerald">
        <NuxtLink class="flex flex-col w-full px-12 py-2 text-center transition-colors duration-300 ease-in-out lg:py-4 hover:bg-white hover:text-emerald" to="/">Home</NuxtLink>
        <NuxtLink class="flex flex-col w-full px-12 py-2 text-center transition-colors duration-300 ease-in-out lg:py-4 hover:bg-white hover:text-emerald"  to="/about">About</NuxtLink>
        <NuxtLink class="flex flex-col w-full px-12 py-2 text-center transition-colors duration-300 ease-in-out lg:py-4 hover:bg-white hover:text-emerald" to="/profile">Profile</NuxtLink>
      </nav>
    </header>
</template>

<script lang="ts" setup>

</script>

<style>

</style>