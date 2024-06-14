<template>
  <div class="flex items-center justify-center min-h-screen bg-almostWhite">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 class="mb-6 text-2xl font-bold text-emerald">Login</h1>
      <form @submit.prevent="signIn" class="space-y-4">
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
            >
              {{ showPassword ? 'hide' : 'show' }} Password
            </button>
          </div>
        </div>
        <button 
          type="submit" 
          class="w-full p-2 text-white rounded bg-torch hover:bg-apricot"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="mt-4 text-torch">{{ error }}</p>
      <p class="mt-4 text-eucalyptus">
        Don't have an account? 
        <nuxt-link to="/signup" class="text-torch hover:text-apricot">Sign up here</nuxt-link>
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
      error: ""
    }
  },
  methods: {
    async signIn() {
      const supabase = useSupabaseClient();     
      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })
      if (error) {
        this.error = error.message
      } else {
        this.$router.push("/")
      }
    }
  }
}
</script>