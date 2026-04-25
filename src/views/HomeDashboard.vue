<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const showWelcome = ref(false)

onMounted(() => {
  if (userStore.justLoggedIn) {
    showWelcome.value = true

    setTimeout(() => {
      showWelcome.value = false
      userStore.justLoggedIn = false
    }, 1500)
  }
})
</script>

<template>
  <main class="flex justify-center">
    <div class="flex max-w-[600px] flex-1 items-center justify-center p-4">
      <!---Welcome Screen-->
      <Transition
        name="fade"
        mode="out-in"
      >
        <h1
          v-if="showWelcome"
          key="welcome"
          class="text-6xl font-thin text-slate-800"
        >
          Welcome, {{ userStore.user }}!
        </h1>

        <!---Actual Dashboard-->
        <div
          v-else
          key="dashboard"
          class="flex w-full flex-col space-y-4 border p-4"
        >
          <h1 class="text-center text-3xl">Need It</h1>
          <header class="flex w-full flex-col">
            <div class="flex w-full items-center justify-between p-4">
              <h1>{{ userStore.user }}</h1>
              <RouterLink
                to="/HomePage"
                class="p-4 underline"
              >
                log out
              </RouterLink>
            </div>

            <div class="flex flex-1 justify-between">
              <button
                class="flex w-[25%] justify-center rounded-full bg-amber-200 px-2 py-3 text-center text-sm"
              >
                Were Out
              </button>

              <button
                class="flex w-[25%] justify-center rounded-full bg-amber-200 px-2 py-3 text-center text-sm"
              >
                Low
              </button>

              <button
                class="flex w-[25%] justify-center rounded-full bg-amber-200 px-2 py-3 text-center text-sm"
              >
                Go to Home List
              </button>
            </div>
          </header>

          <section class="">
            <h2>Were out</h2>
            <div class="h-40 w-full rounded-2xl border bg-amber-100"></div>
          </section>

          <section class="">
            <h2>Were out</h2>
            <div class="h-40 w-full rounded-2xl border bg-amber-100"></div>
          </section>
        </div>
      </Transition>
    </div>
  </main>
</template>
