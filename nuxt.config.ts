// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  plugins: [
    '~/plugins/beforeStartup.ts'
  ],  
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/',
      include: ["/profile", "/addExperience"]
      // exclude: ['/', '/register'],
    }
  }
})