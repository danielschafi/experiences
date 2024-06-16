<template>
  <div class="flex flex-col items-center w-full min-h-screen bg-lightgray">
    <div class="w-full max-w-4xl p-8 bg-white shadow-md">
      <h1 class="mb-4 text-3xl font-bold text-emerald">{{ event.title }}</h1>
      <img v-if="event.image" :src="event.image" alt="Event Image" class="mx-auto mb-4 rounded-md max-h-96 " />
      <p class="mb-4 text-lg text-gray-700 whitespace-pre-line">{{ event.description }}</p>
      <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
        <div>
          <span class="block text-eucalyptus">Min Participants:</span>
          <span class="block text-lg">{{ event.minParticipants }}</span>
        </div>
        <div>
          <span class="block text-eucalyptus">Max Participants:</span>
          <span class="block text-lg">{{ event.maxParticipants }}</span>
        </div>
        <div>
          <span class="block text-eucalyptus">Date:</span>
          <span class="block text-lg">{{ formatDate(event.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

const event = ref({
  title: '',
  description: '',
  minParticipants: '',
  maxParticipants: '',
  date: '',
  image: ''
})

const id = route.params.id

const fetchEvent = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(error)
    return
  }
  
  event.value = {
    title: data.title,
    description: data.description,
    minParticipants: data.min_participants,
    maxParticipants: data.max_participants,
    date: data.date,
    image: data.image
  }
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(fetchEvent)
</script>

