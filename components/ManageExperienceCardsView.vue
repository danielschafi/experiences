<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
    <ExperienceCard v-for="experience in experiences" :key="experience.id"
                    :experienceId="experience.id"
                    :title="experience.title"
                    :description="experience.description"
                    :date="experience.date"
                    :image="experience.image"
                    :options="true" />
  </div>
</template>

<script setup>


const experiences = ref([]);
const supabase = useSupabaseClient();

onMounted(async () => {
  try {
    const user = await supabase.auth.user();
    if (user) {
      // Fetch experiences for the current user
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw new Error(`Error fetching experiences: ${error.message}`);
      } else {
        experiences.value = data;
      }
    } else {
      console.error('User not authenticated.');
    }
  } catch (error) {
    console.error('Error fetching experiences:', error);
  }
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
