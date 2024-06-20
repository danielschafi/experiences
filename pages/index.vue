<template>
  <div>
    <button @click="goToAddExperiencePage" class="p-2 mt-8  text-white rounded sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-emerald hover:bg-eucalyptus transition-colors duration-200 ease-in-out">Create Experience</Button>
    <ExperienceCardsView />
  </div>
</template>


<script lang="ts" setup>
const goToAddExperiencePage = () => {
  navigateTo("/addExperience")
}

</script>