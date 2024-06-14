<template>
  <div class="flex items-center justify-center min-h-screen bg-lightgray">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 class="mb-6 text-2xl font-bold text-emerald">Signup</h1>
        <form @submit.prevent="signUp" class="space-y-4">
          <div>
            <label for="email" class="block mb-2 text-eucalyptus">Email:</label>
            <input 
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

<script lang="ts">

export default {
  data() {
    return {
      email: "", 
      password: "", 
      confirmPassword: "", 
      error: "" ,
      showConfirmPassword: false,
      showPassword: false
    }
  },
  methods: {
    async signUp() {
      const supabase = useSupabaseClient();
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match."
        return
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        })
        console.log("EMAIL", this.email);
        console.log("PSW", this.password);
        console.log("USER", data);
        
        
        

        if (error) {
          this.error = error.message
        } else {
          // On success, redirect to the homepage or login page
          this.$router.push("/login")
        }
      } catch (err) {
        this.error = "An unexpected error occurred."
        console.error("Unexpected error:", err)
      }
    }
  }
}
</script>
