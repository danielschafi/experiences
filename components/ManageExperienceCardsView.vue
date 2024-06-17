<template>
  <div class="w-full max-w-full p-8 mb-auto">
    <h1 class="mb-6 text-2xl font-bold text-emerald">Your Experiences</h1>
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2"> 
      <ExperienceCard v-for="experience in experiences" :key="experience.id"
                      :experienceId="experience.id"
                      :title="experience.title"
                      :description="experience.description"
                      :date="experience.date"
                      :image="experience.image"
                      :options="true" />
    </div>
  </div>
 
</template>

<script setup>
const experiences = ref([]);
const supabase = useSupabaseClient();
const user = useSupabaseUser();


onMounted(async () => {

  if (user.value.id) {
    const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .eq("user_id", user.value.id)
        
        if (error) {
          console.error("Error fetching experiences:", error)
        } else {
          experiences.value = data
        }
      }
})
</script>

<style scoped>
/* Add your scoped styles here */
</style>
