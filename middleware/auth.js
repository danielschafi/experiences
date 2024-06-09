export default defineNuxtRouteMiddleware((to, from) => {

    console.log("route:", to)
    const user = useSupabaseUser()

  
    // if (!user.value) {
    //     return navigateTo('/login')
    // }
})
