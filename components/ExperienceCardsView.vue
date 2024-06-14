<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
    <template v-for="experience in experiences" :key="experience.id">
      <ExperienceCard :experienceId="experience.id" :title="experience.title" :description="experience.description" :date="experience.date" :image="experience.image" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const experiences = ref([])
const supabase = useSupabaseClient()

onMounted(async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')

  if (error) {
    console.error('Error fetching experiences:', error)
  } else {
    experiences.value = data
    console.log("XP:", experiences);
    
  }
})
</script>

<style>

</style>