<template>
  <form @submit.prevent="createAccount">
    <div v-if="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="text-green-500">
      {{ successMessage }}
    </div>

    <div class="mb-4">
      <label class="block font-bold" for="email">Email</label>
      <input type="email" v-model="email" name="email" id="email" class="w-full px-3 py-2 text-black border rounded">
    </div>
    <div class="mb-4">
      <label class="block font-bold" for="full_name">Full Name</label>
      <input type="text" v-model="full_name" name="full_name" id="full_name" class="w-full px-3 py-2 text-black border rounded">
    </div>
    <div class="mb-4">
      <label class="block font-bold" for="password">Password</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="password" name="password" id="password" class="w-full px-3 py-2 text-black border rounded">
      <button type="button" @click="showPassword = !showPassword" class="mt-2 text-sm text-blue-500">{{ showPassword ? 'Hide' : 'Show' }} Password</button>
    </div>
    <div class="mb-4">
      <label class="block font-bold" for="confirmPassword">Confirm Password</label>
      <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" name="confirmPassword" id="confirmPassword" class="w-full px-3 py-2 text-black border rounded">
      <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="mt-2 text-sm text-blue-500">{{ showConfirmPassword ? 'Hide' : 'Show' }} Confirm Password</button>
    </div>

    <div class="mt-6">
      <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" :disabled="signingup">
        Create Account
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
      full_name:"",
      errorMessage: "",
      successMessage: "",
      sigingup: false,
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      showAccountCreation: false
    }
  },
  methods: {
    async createAccount() {
      const supabase = useSupabaseClient()
      this.sigingup = true
      try {

        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              full_name: this.full_name,
              client_group: this.$route.query.group,
              is_client: this.$route.query.client,
            }
          }
        })
        console.log(data);
        if (error) {
          throw error
        } else {
          this.successMessage = "Account created successfully! Please check your email"
        // redirect to login page
        }
        
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.sigingup = false
        setTimeout(() => {
          this.$router.push("/")
        }, 3000);
      }
      
    }
  }
}
</script>

<style>

</style>