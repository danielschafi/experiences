<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
    <template v-for="experience in experiences" :key="experience.id">
      <ExperienceCard :experienceId="experience.id" :title="experience.title" :description="experience.description" :date="experience.date" :image="experience.image" :options=true />
    </template>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'

const experiences = ref([])
const supabase = useSupabaseClient()


onMounted(async () => {
  const supabase = useSupabaseClient()
  const user = await useSupabaseClient().auth.getUser();
  
  if (user.data.user.id) {

        // Fetch experiences for the current user
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .eq('user_id', user.data.user.id)
        
        if (error) {
          console.error('Error fetching experiences:', error)
        } else {
          experiences.value = data
        }
      }
})


</script>

<style>

</style>