<template>
  <div class="mx-4 mb-8 md:mx-8">
    <button @click="goToAddExperiencePage" class="w-full p-2 my-6 text-white rounded max-w-72 bg-emerald">Create Experience</Button>
    <ExperienceCardsView />
  </div>
</template>


<script lang="ts" setup>
function goToAddExperiencePage() {
  navigateTo("/addExperience")
}

</script>

<style>

</style>