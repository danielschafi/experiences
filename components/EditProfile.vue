<template>
  <div class="flex items-center justify-center h-full ">
    <div class="w-full max-w-full p-8 mb-auto">
      <h1 class="mb-6 text-2xl font-bold text-emerald">Edit Profile</h1>
      <form @submit.prevent="updateProfile" class="space-y-4 ">
        <div>
          <label for="username" class="block mb-2 text-eucalyptus">Username:</label>
          <input
            type="text"
            v-model="username"
            id="username"
            required
            class="w-full p-2 border rounded border-eucalyptus"
          />
        </div>
        <div>
          <label for="publicPhoneNr" class="block mb-2 text-eucalyptus">Public phone number:</label>
          <input
            type="tel"
            v-model="publicPhoneNr"
            id="publicPhoneNr"
            required
            class="w-full p-2 border rounded border-eucalyptus"
          />
        </div>
        <div>
          <label for="publicEmail" class="block mb-2 text-eucalyptus">Public email:</label>
          <input
            type="email"
            v-model="publicEmail"
            id="publicEmail"
            class="w-full p-2 border rounded border-eucalyptus"
          />
        </div>
        <hr>
        <div>
          <label for="email" class="block mb-2 text-eucalyptus">Email:</label>
          <input
            type="email"
            tabindex="-1"
            v-model="email"
            id="email"
            readonly
            class="w-full p-2 border rounded border-eucalyptus"
          />
        </div>
        <p v-if="error" class="mt-4 text-torch">{{ error }}</p>
        <p v-if="success" class="mt-4 text-eucalyptus">{{ success }}</p>
        <button
          type="submit"
          class="w-full p-2 text-white rounded bg-torch hover:bg-apricot"
        >
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>

const username = ref("");
const publicPhoneNr = ref("");
const publicEmail = ref("");
const email = ref("");
const error = ref("");
const success = ref("")
const router = useRouter();
const supabase = useSupabaseClient();

const fetchUserData = async () => {
  try {
    const user = useSupabaseUser();
    
    if (user.value) {
      console.log(user.value);
      
      username.value = user.value.user_metadata.username;
      publicPhoneNr.value = user.value.user_metadata.public_phone_nr;
      publicEmail.value = user.value.user_metadata.public_email;
      email.value = user.value.email;
      
    } else {
      throw new Error("User not authenticated.");
    }
  } catch (err) {
    error.value = "Failed to fetch user data.";
    console.error("Fetch user data error:", err);
  }
};



// Update user profile data
const updateProfile = async () => {
  success.value = ""
  error.value = ""

  try {
    const user = useSupabaseUser();

    if (user.value) {
        const { data, error: updateError } = await supabase.auth.updateUser({
              data: {
                username: username.value,
                public_phone_nr: publicPhoneNr.value,
                public_email: publicEmail.value
              }
          })          

      if (updateError) {
        throw new Error(`Error updating profile: ${updateError.message}`);
      }

      router.push("/profile"); 
      success.value = "Profile info updated successfully"
    } else {
      throw new Error("User not authenticated.");
    }
  } catch (err) {
    error.value = "Failed to update profile.";
    console.error("Update profile error:", err);
  }
};

fetchUserData(); // Fetch user data when component is mounted
</script>

<style>

</style>