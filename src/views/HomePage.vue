<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  // Simulate login logic
  if (username.value && password.value) {
    userStore.login(username.value)
    router.push('/dashboard')
  } else {
    alert('Please enter username and password')
  }
}
</script>

<template>
  <main class="">
    <div class="mx-auto w-[95%vw] max-w-[600px] rounded-2xl bg-amber-100 px-2 sm:px-0">
      <div class="px-10 pt-10 pb-20">
        <h1 class="mb-10 text-center text-4xl">NeedIt</h1>
        <form
          class="space-y-4"
          @submit.prevent="handleLogin"
        >
          <label class="text-sm font-medium text-gray-700">User:</label>
          <input
            v-model="username"
            type="text"
            class="h-11 w-full rounded-xl border bg-white p-2"
          />

          <label class="text-sm font-medium text-gray-700">Password:</label>
          <input
            v-model="password"
            type="password"
            class="h-11 w-full rounded-xl border bg-white p-2"
          />

          <div class="flex w-full items-center justify-between">
            <label class="">
              <input type="checkbox" />
              <span class="tracking-widest"> Stay logged in </span>
            </label>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              class="mt-6 flex w-[80%] justify-center rounded-full bg-amber-800 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-amber-700 active:translate-y-0.5 active:shadow-sm"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
