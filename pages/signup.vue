<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signUp">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input :type="showPassword ? 'text': 'password'"  v-model="password" id="password" required />
        <button type="button" @click="showPassword = !showPassword"> {{ showPassword ? 'hide' : 'show' }}</button>
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input :type="showConfirmPassword ? 'text': 'password'"  v-model="confirmPassword" id="confirmPassword" required />
        <button type="button" @click="showConfirmPassword = !showConfirmPassword"> {{ showConfirmPassword ? 'hide' : 'show' }}</button>
      </div>
      <button type="submit">Signup</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      email: "", 
      password: "", 
      confirmPassword: "", 
      error: "" 
    }
  },
  methods: {
    async signUp() {
      const supabase = useSupabaseClient()
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match."
        return
      }

      try {
        const { error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password
        })

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
