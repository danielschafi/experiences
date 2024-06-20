<template>
  <div class="flex items-center justify-center min-h-screen bg-lightgray">
    <div class="w-full max-w-md p-8 bg-white shadow-md">
      <h1 class="mb-6 text-2xl font-bold text-emerald">Signup</h1>
      <form @submit.prevent="signUp" class="space-y-4">
        <div>
          <label for="username" class="block mb-2 text-eucalyptus">Username:</label>
          <input 
            title="Name that other users will see"
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
            title="Phone number, visible to other users"
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
            title="Email, visible to other users"
            type="email" 
            v-model="publicEmail" 
            id="publicEmail" 
            required 
            class="w-full p-2 border rounded border-eucalyptus" 
          />
        </div>
        <hr>
        <div>
          <label for="email" class="block mb-2 text-eucalyptus">Email:</label>
          <input 
            title="Used to login. Not visible to other users"
            type="email" 
            v-model="email" 
            id="email" 
            required 
            class="w-full p-2 border rounded border-eucalyptus" 
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-eucalyptus">Password:</label>
          <div class="relative">
            <input 
              title="Used to login. Not visible to other users"
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              id="password" 
              required 
              class="w-full p-2 border rounded border-eucalyptus " 
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute right-2 top-2 text-torch hover:text-apricot"
              tabindex="-1"
            >
              {{ showPassword ? 'hide' : 'show' }} Password
            </button>
          </div>
        </div>
        <div>
          <label for="confirmPassword" class="block mb-2 text-eucalyptus">Confirm Password:</label>
          <div class="relative">
            <input 
              title="Used to login. Not visible to other users"
              :type="showConfirmPassword ? 'text' : 'password'" 
              v-model="confirmPassword" 
              id="confirmPassword" 
              required 
              class="w-full p-2 border rounded border-eucalyptus " 
            />
            <button 
              type="button" 
              @click="showConfirmPassword = !showConfirmPassword" 
              class="absolute right-2 top-2 text-torch hover:text-apricot"
              tabindex="-1"
            >
              {{ showConfirmPassword ? 'hide' : 'show' }} Password
            </button>
          </div>
        </div>
        <button 
          type="submit" 
          class="w-full p-2 text-white rounded bg-torch hover:bg-apricot"
        >
          Signup
        </button>
      </form>
      <p v-if="error" class="mt-4 text-torch">{{ error }}</p>
      <p class="mt-4 text-eucalyptus">
        Already have an account? 
        <nuxt-link to="/login" class="text-torch hover:text-apricot">Login here</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref("")
const publicPhoneNr = ref("")
const publicEmail = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref("")
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const router = useRouter()
const supabase = useSupabaseClient()

const signUp = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match."
    return
  }

  try {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          username: username.value,
          public_phone_nr: publicPhoneNr.value,
          public_email: publicEmail.value
        }
      }
    })

    if (signUpError) {
      error.value = signUpError.message + " Please contact support"
    } else {
      router.push("/login")
    }
  } catch (err) {
    error.value = "An unexpected error occurred."
    console.error("Unexpected error:", err)
  }
}
</script>