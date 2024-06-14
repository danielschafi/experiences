<template>
  <article @click="goToExperiencePage" class="flex flex-col w-full p-2 overflow-hidden transition-all border-2 border-solid rounded border-eucalyptus hover:shadow-md hover:scale-105 duration-400">
    <img class="block m-auto rounded shadow md:max-h-72 sm:max-h-screen " :src='image' :alt="description">
    <div class="flex-grow p-2">
      <div class="mb-1 text-xl font-bold"> {{ title }} </div>
      <div class="line-clamp-5 text-pretty">
        {{description}} ...
      </div>
    </div>
    <div class="p-2">
      <hr class="mb-4">
      <span class="inline-block text-sm font-semibold rounded-full">{{ date }}</span>
    </div>
  </article>

</template>

<script lang="js" setup>
const props = defineProps({
  image: String,
  title: String,
  description: String,
  date: String
});

function goToExperiencePage() {
  navigateTo("/about")
}
</script>

<style>

</style>