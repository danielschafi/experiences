<template>
  <div class="grid grid-cols-1 gap-4 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> 
    <ExperienceCard v-for="experience in experiences" :key="experience.id"
                    :experienceId="experience.id"
                    :title="experience.title"
                    :description="experience.description"
                    :date="experience.date"
                    :image="experience.image"/>
  </div>
</template>

<script setup lang="ts">

const experiences = ref([]);
const supabase = useSupabaseClient();

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from("experiences")
      .select("*");

    if (error) {
      throw new Error(`Error fetching experiences: ${error.message}`);
    } else {
      experiences.value = data;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

