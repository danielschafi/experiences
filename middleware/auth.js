import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware((to, from) => {
    const nuxtApp = useNuxtApp()
    const pinia = nuxtApp.$config.pinia
    
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const authStore = useAuthStore(pinia)

    console.log("AuthStore", authStore);
    console.log("USER", user);
    
    // Connect to supabase
    try {
    const {data: session, error } = supabase.auth.getSession()
    if (error){
        console.log(error)
    }else {
        console.log(session)
    }
    } catch (error) {
        console.error(error)
    }


    // Try to find the user in the database
    try {
    const {data:profile, error} = supabase.from("profiles")
        .select("*")
        .eq("id", user.value.id).single()

        if (error) {
            throw(error)
        }
        authStore.profile = profile

    } catch (error) {
        console.log(error);
    }

    if (!user.value) {
    return navigateTo("/login")
    }

    // save user value to the store
    authStore.user = user.value


    console.log("StoreCompleted", authStore)

})
