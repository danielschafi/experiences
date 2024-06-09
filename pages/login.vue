<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="signIn">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input :type="showPassword ? 'text': 'password'" v-model="password" id="password" required />
        <button type="button" @click="showPassword = !showPassword"> {{ showPassword ? 'hide' : 'show' }} Password</button>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p>Don't have an account? <nuxt-link to="/signup">Sign up here</nuxt-link></p>
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