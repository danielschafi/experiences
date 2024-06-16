<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div >
      <h1 class="mb-6 text-2xl font-bold text-emerald">Your Profile</h1>

    </div>
    <div>
      <h1 class="mb-6 text-2xl font-bold text-emerald">Your Experiences</h1>
      <div class="grid grid-cols-1 gap-4 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "> 
        <template v-for="experience in experiences" :key="experience.id">
          <ExperienceCard :experienceId="experience.id" :title="experience.title" :description="experience.description" :date="experience.date" :image="experience.image" :options=true />
        </template>
      </div>
    </div>

  </div>

</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'

const experiences = ref([])
const supabase = useSupabaseClient()


const username = ref("")
const public_phone_nr = ref("")
const public_email = ref("")


const updateUser = async () => {
  const { data, error } = await supabase.auth.updateUser({
        data: {
          username: username.value,
          public_phone_nr: public_phone_nr.value,
          public_email: public_email.value
        }
    })
}


onMounted(async () => {
  const supabase = useSupabaseClient()
  const user = await useSupabaseClient().auth.getUser();
  




  if (user.data.user.id) {

    console.log(user);

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