<template>
  <div class="flex items-center justify-center min-h-screen bg-lightgray">
    <div class="w-full max-w-4xl min-h-screen p-8 bg-white shadow-md">
      <h1 class="mb-6 text-2xl font-bold text-emerald">Edit Experience</h1>
      
      <form @submit.prevent="updateExperience" class="min-h-screen space-y-4">
        
        <label for="title" class="block mb-2 text-eucalyptus">Title</label>
        <input type="text" v-model="title" id="title" class="w-full p-2 border rounded border-eucalyptus">

        <label for="description" class="block mb-2 text-eucalyptus">Description</label>
        <textarea v-model="description" id="description" rows="20" cols="80"  class="w-full p-2 border rounded border-eucalyptus"></textarea>

        <div id="participants" class="container mx-auto">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label for="minParticipants" class="block mb-2 text-eucalyptus">Min Participants</label>
              <input type="number" v-model="minParticipants" id="minParticipants" class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
            <div>
              <label for="maxParticipants" class="block mb-2 text-eucalyptus">Max Participants</label>
              <input type="number" v-model="maxParticipants" id="maxParticipants" class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
            <div>
              <label for="date" class="block mb-2 text-eucalyptus">Date</label>
              <input type="date" v-model="date" id="date" class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
          </div>
        </div>

        <label for="image" class="block mb-2 text-eucalyptus">Image</label>
        <input type="file" ref="fileInput" accept="image/*" @change="onFilePicked" id="image" class="w-full p-2 border rounded border-eucalyptus">

        <button type="submit" class="w-full p-2 text-white rounded bg-torch">Save Changes</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p v-if="message">{{ message }}</p>
      
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const supabase = useSupabaseClient()

    const id = route.params.id
    const title = ref('')
    const description = ref('')
    const minParticipants = ref('')
    const maxParticipants = ref('')
    const date = ref('')
    const image = ref(null)
    const imageUrl = ref('')
    const error = ref('')
    const message = ref('')

    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error(error)
        return
      }
      
      title.value = data.title
      description.value = data.description
      minParticipants.value = data.min_participants
      maxParticipants.value = data.max_participants
      date.value = data.date
      imageUrl.value = data.image
    }

    const updateExperience = async () => {
      try {
        let updatedImageUrl = imageUrl.value

        if (image.value) {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('experienceImages')
            .upload(`public/${Date.now()}_${image.value.name}`, image.value, { upsert: true })
          
          if (uploadError) {
            throw uploadError
          }

          updatedImageUrl = supabase.storage.from('experienceImages').getPublicUrl(uploadData.path).data.publicUrl
        }

        const { error: updateError } = await supabase
          .from('experiences')
          .update({
            title: title.value,
            description: description.value,
            min_participants: minParticipants.value,
            max_participants: maxParticipants.value,
            date: date.value,
            image: updatedImageUrl,
          })
          .eq('id', id)

        if (updateError) {
          throw updateError
        }

        message.value = "Experience updated successfully"
        router.push('/')
      } catch (error) {
        error.value = error.message
        console.error('Error updating experience:', error)
      }
    }

    const onFilePicked = (event) => {
      const files = event.target.files
      if (files.length > 0) {
        image.value = files[0]
      }
    }

    onMounted(fetchExperience)

    return {
      title,
      description,
      minParticipants,
      maxParticipants,
      date,
      image,
      imageUrl,
      error,
      message,
      onFilePicked,
      updateExperience,
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>
