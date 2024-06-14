<template>
  <div>

      <Button @click="goToExperiencePage" class="p-2 m-2 text-white rounded bg-emerald">Create your own Experience</Button>
    <ExperienceCardsView />
  </div>
</template>

<script lang="ts" setup>
function goToExperiencePage() {
  navigateTo("/addExperience")
}

</script>

<style>

</style>