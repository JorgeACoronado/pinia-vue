import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: '',
    isLoggedIn: false,
    justLoggedIn: false,
  })
  // const user = ref('')
  // const isLoggedIn = ref(false)

  function login(username) {
    state.user = username
    state.isLoggedIn = true
    state.justLoggedIn = true
    // user.value = username
    // isLoggedIn.value = true
  }

  function logout() {
    state.user = ''
    state.isLoggedIn = false
    state.justLoggedIn = false
    // user.value = ''
    // isLoggedIn.value = false
  }

  return {
    // user,
    // isLoggedIn,
    ...toRefs(state),
    login,
    logout,
  }
})
