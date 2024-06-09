<template>
  <div class="flex justify-between m-4 flex-wrap ">
    <ExperienceCard />
        <ExperienceCard />
    
            <ExperienceCard />
        

                <ExperienceCard />
                <ExperienceCard />
            
                    <ExperienceCard />
                
                        <ExperienceCard />
                    
                            <ExperienceCard />
                        
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
    console.log(data)
    experiences.value = data
  }
})
</script>

<style>

</style>