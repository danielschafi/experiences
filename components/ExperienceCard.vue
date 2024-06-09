<template>
  <div @click="goToExperiencePage" class="w-1/4 rounded overflow-hidden p-2 border-emerald border-solid hover:scale-105 transition-all duration-400">
    <img class="w-full" src='https://picsum.photos/2000/2000' alt="Sunset in the mountains">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
      <p class="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
  </div>

</template>

<script lang="ts" setup>
const props = defineProps({
  image: String,
  title: String,
  description: String,
});

function goToExperiencePage() {
  navigateTo("/about")
}
</script>

<style>

</style>