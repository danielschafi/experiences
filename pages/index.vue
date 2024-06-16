<template>
  <div>
    <button @click="goToAddExperiencePage" class="w-full p-2 mt-8 text-white rounded max-w-72 bg-emerald">Create Experience</Button>
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