<template>
  <div class="flex items-center justify-center min-h-full ">
    <div class="w-full max-w-4xl p-8 bg-white shadow-md min-full">
      <h1 class="mb-6 text-2xl font-bold text-emerald">Create Experience</h1>
      
      <form @submit.prevent="createExperience"  class="min-h-screen space-y-4" ref="createExperienceForm">
        
        <label for="title" class="block mb-2 text-eucalyptus">Title</label>
        <input type="text" v-model="title" id="title" 
        class="w-full p-2 border rounded border-eucalyptus">

        
        <label for="description" class="block mb-2 text-eucalyptus">Description</label>
        <textarea type="text" v-model="description" id="description" rows="6" cols="50"
        class="w-full p-2 border rounded border-eucalyptus"></textarea>

        <div id="participants" class="container mx-auto">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="">
              <label for="minParticipants" class="block mb-2 text-eucalyptus">Min Participants</label>
              <input type="number" v-model="minParticipants" id="minParticipants"
              class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
            <div class="">
              <label for="maxParticipants" class="block mb-2 text-eucalyptus">Max Participants</label>
              <input type="number" v-model="maxParticipants" id="maxParticipants"
              class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>
            <div class="">
              <label for="date" class="block mb-2 text-eucalyptus">Date</label>
              <input type="date" v-model="date" id="date" 
              class="w-full py-2 text-center border rounded border-eucalyptus">
            </div>          
          </div>
        </div>
        
        <label for="image" class="block mb-2 text-eucalyptus">Image</label>
        <input type="file" ref="fileInput" accept="image/*" @change="onFilePicked" id="image" 
        class="w-full p-2 border rounded border-eucalyptus">

        <button type="submit" class="w-full p-2 text-white rounded bg-torch">Create</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p v-if="message">{{ message }}</p>
      
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      title: "", 
      description: "", 
      category: "", 
      error: "",
      message:"",
      maxParticipants: "",
      minParticipants: "",
      date: "",
      image: null,
      imageUrl: "",
      time: ""
    }
  },
  methods: {
    async createExperience() {
      this.message = "";
      this.error = "";
    
      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user){
        console.log("Cant insert, user is none");
      }
      else {
        try {
          // Upload image to Supabase storage

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('experienceImages')
            .upload(`public/${Date.now()}_${this.image.name}`, this.image, {upsert: true})

          if (uploadError) {
            throw uploadError
          }

          this.imageUrl = supabase.storage.from('experienceImages').getPublicUrl(uploadData.path).data.publicUrl;

          // Prepare data for insertion
          const dataToInsert = this.filterData({ 
            description: this.description, 
            title: this.title,
            max_participants: this.maxParticipants,
            min_participants: this.minParticipants,
            date: this.date,
            image: this.imageUrl
          })

          // Insert data into the database
          const { data, error } = await supabase.from('experiences')
            .insert([dataToInsert])
            .select()

          if (error) {
            throw error
          }
          
          this.message = "Experience created successfully"
        navigateTo("/")
          
        } catch (error) {
          this.error = error.message
          console.error('Error creating experience:', error)
        }
      }
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      if (files.length > 0) {
        this.image = files[0]
      }
    },
    filterData(data) {
      return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== '')
      )
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>
