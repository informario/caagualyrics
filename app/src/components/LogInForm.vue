<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { login } from "@/services/auth.js";

const router = useRouter()
const email = ref("")       // era username, ahora es email
const password = ref("")

const logIn = async function () {
  console.log("intentando login con:", email.value, password.value)  // ← agregá esto
  console.log("projectId:", import.meta.env.VITE_FIREBASE_PROJECT_ID)

  if (email.value === "" || password.value === "") {
    window.alert("Por favor completar los campos correspondientes")
    return
  }
  try {
    await login(email.value, password.value )
    // Firebase maneja la sesión automáticamente, no hay JWT que guardar en localStorage
    router.push("/editor")
  } catch (error) {
    console.log("CODIGO:", error.code)
    console.log("MENSAJE:", error.message)
    window.alert(error.code)

    // Firebase devuelve códigos como 'auth/invalid-credential', 'auth/user-not-found'
    if (error.code?.startsWith('auth/')) {
      window.alert("Email o contraseña incorrectos")
    } else {
      console.log("Error al iniciar sesión", error)
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen bg-gray-200 dark:bg-gray-800 ring-gray-900/5">
    <div class="w-1/3 h-2/3 flex flex-col items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 shadow-lg font-light">
      <p class="text-4xl m-3 font-medium dark:text-white">Welcome</p>
      <p class="text-xl m-2 font-normal dark:text-white">Log in to continue</p>
      <input class="border border-gray-400 text-gray-600 dark:text-white p-2 rounded-md m-3" placeholder="Email" v-model="email">
      <input class="border border-gray-400 text-gray-600 dark:text-white p-2 rounded-md m-3" placeholder="Password" type="password" v-model="password">
      <button class="bg-indigo-600 text-white p-2 rounded-md m-3" @click="logIn()">Log in</button>
    </div>
  </div>
</template>

<style scoped>
</style>