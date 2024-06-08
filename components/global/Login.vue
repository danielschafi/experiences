<template>
  <form @submit.prevent="signInWithEmail">
    <div class="mb-4">
      <label class="block font-bold" for="email">Email</label>
      <input type="email" v-model="email" name="email" id="email" class="w-full px-3 py-2 text-black border rounded">
    </div>
    <div class="mb-4">
      <label class="block font-bold" for="password">Password</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="password" name="password" id="password" class="w-full px-3 py-2 text-black border rounded">
      <button type="button" @click="showPassword = !showPassword" class="mt-2 text-sm text-blue-500">{{ showPassword ? 'Hide' : 'Show' }} Password</button>
    </div>

    <div class="mt-6">
      <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Sign In
      </button>
    </div>
  </form>
</template>


<script lang="ts">
export default {
  data () {
    return {
      email:"",
      password:"",
      errors: [],
      showPassword: false
    }
  },
  methods: {
    async signInWithEmail() {
      const authClient = useSupabaseAuthClient()

      try {
        const { user, error } = await authClient.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        })
        if (error) {
          throw(error)
        } else {
          // Reload Page on successful login
          location.replace("/")
        }
        
      } catch (error) {
        this.$toast.error(error.message);
      } 
    }
  }
}
</script>

<style>

</style>