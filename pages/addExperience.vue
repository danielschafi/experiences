<template>
  <div class="flex items-center justify-center min-h-full ">
    <div class="w-full max-w-4xl p-8 bg-white shadow-md ">
      <h1 class="mb-6 text-2xl font-bold text-emerald">Create Experience</h1>
      
      <form @submit.prevent="createExperience" class="min-h-screen space-y-4" ref="createExperienceForm">
        <label for="title" class="block mb-2 text-eucalyptus">Title</label>
        <input type="text" required v-model="title" id="title" 
        class="w-full p-2 border rounded border-eucalyptus">

        <label for="description" class="block mb-2 text-eucalyptus">Description</label>
        <textarea type="text" v-model="description" required id="description" rows="6" cols="50"
        class="w-full p-2 border rounded border-eucalyptus"></textarea>

        <div id="participants" class="container mx-auto">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label for="minParticipants" class="block mb-2 text-eucalyptus">Min Participants</label>
              <input type="number" v-model="minParticipants" id="minParticipants"
              class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
            <div>
              <label for="maxParticipants" class="block mb-2 text-eucalyptus">Max Participants</label>
              <input type="number" v-model="maxParticipants" id="maxParticipants"
              class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
            <div>
              <label for="date" class="block mb-2 text-eucalyptus">Date</label>
              <input type="date" v-model="date" required id="date" 
              class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>          
          </div>
        </div>
        
        <label for="image" class="block mb-2 text-eucalyptus">Image</label>
        <input type="file" ref="fileInput" accept="image/*" @change="onFilePicked" id="image" 
        class="w-full p-2 border rounded border-eucalyptus">

        <button type="submit" class="w-full p-2 text-white rounded bg-torch hover:bg-apricot transition-colors duration-200 ease-in-out">Create</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
const title = ref("")
const description = ref("")
const error = ref("")
const message = ref("")
const maxParticipants = ref("")
const minParticipants = ref("")
const date = ref("")
const image = ref(null)
const imageUrl = ref("")
const fileInput = ref(null)

const router = useRouter()
const supabase = useSupabaseClient()

const createExperience = async () => {
  message.value = ""
  error.value = ""

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    console.log("Can't insert, user is none")
    return
  }
  
  try {
    if (image.value){
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("experienceImages")
        .upload(`public/${Date.now()}_${image.value.name}`, image.value, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      imageUrl.value = supabase.storage.from("experienceImages").getPublicUrl(uploadData.path).data.publicUrl
    }
    
    const dataToInsert = filterData({ 
      description: description.value, 
      title: title.value,
      max_participants: maxParticipants.value,
      min_participants: minParticipants.value,
      date: date.value,
      image: imageUrl.value
    })

    const { data, error: insertError } = await supabase.from("experiences")
      .insert([dataToInsert])
      .select()

    if (insertError) {
      throw insertError
    }

    message.value = "Experience created successfully"
    alert(message.value)
    router.push("/")
    
  } catch (error) {
    error.value = error.message
    console.error("Error creating experience:", error)
  }
}

const onFilePicked = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    image.value = files[0]
  }
}

const filterData = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== null && value !== "")
  )
}
</script>

