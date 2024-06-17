<template>
  <article @click="goToExperiencePage" class="flex flex-col w-full p-2 overflow-hidden transition-all bg-white border-2 border-solid rounded hover:border-emerald border-eucalyptus hover:shadow-md hover:scale-105 duration-400">
    <img class="block m-auto rounded shadow md:max-h-72 sm:max-h-screen" :src="image" :alt="description">
    <div class="flex-grow p-2">
      <div class="mb-1 text-xl font-bold">{{ title }}</div>
      <div class="line-clamp-5 text-pretty">{{ description }} ...</div>
    </div>
    <div class="p-2">
      <hr class="mb-4">
      <div class="flex flex-row justify-between">
        <span class="inline-block text-sm font-semibold">{{ date }}</span>
        <span v-if="username" class="inline-block text-sm font-semibold">by {{ username }}</span>
      </div>
      
      <div v-if="options" class="grid grid-cols-2 mt-4 space-x-4">
        <button @click.stop="deleteExperience" class="flex items-center justify-center px-4 py-2 text-white rounded bg-torch">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
        <button @click.stop="goToEditPage" class="flex items-center justify-center px-4 py-2 text-white rounded bg-eucalyptus">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>

const props = defineProps({
  image: String,
  title: String,
  description: String,
  date: String,
  options: Boolean,
  experienceId: String,
});

const router = useRouter();
const supabase = useSupabaseClient();
const username = ref("")

const deleteExperience = async () => {
  console.log("DELETED_ID:", props.experienceId);
  
  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", props.experienceId);
  
  if (error) {
    console.error("Error deleting experience:", error);
    alert("Failed to delete Experience")
  } else {
    console.log("Experience deleted successfully");
    alert("Experience deleted successfully")
  }
};

const goToEditPage = () => {
  router.push(`/edit/${props.experienceId}`);
};

const goToExperiencePage = () => {
  router.push(`/experience/${props.experienceId}`);
};

</script>
