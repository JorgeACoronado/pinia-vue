import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref('')
  const isLoggedIn = ref(false)

  function login(username) {
    user.value = username
    isLoggedIn.value = true
  }

  function logout() {
    user.value = ''
    isLoggedIn.value = false
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})
