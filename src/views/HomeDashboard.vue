<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useHomeStore } from '@/stores/homeStore'

const userStore = useUserStore()
const homeStore = useHomeStore()
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

const outItems = computed(() => {
  return homeStore.categories.flatMap((category) =>
    category.items
      .filter((item) => item.status === 'out')
      .map((item) => ({
        ...item,
        category: category.name,
      })),
  )
})

const lowItems = computed(() => {
  return homeStore.categories.flatMap((category) =>
    category.items
      .filter((item) => item.status === 'low')
      .map((item) => ({
        ...item,
        category: category.name,
        claimedBy: item.claimedBy,
      })),
  )
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
          class="flex w-full flex-col space-y-4 rounded-2xl bg-amber-50 p-4 shadow-md shadow-amber-50"
        >
          <h1 class="text-center text-3xl font-bold">Need It</h1>
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

            <div class="flex flex-1 items-center justify-between space-x-2">
              <button
                class="flex w-[25%] justify-center rounded-full border bg-amber-100 px-2 py-3 text-center text-sm"
              >
                Were Out
              </button>

              <button
                class="flex w-[25%] justify-center rounded-full border bg-amber-100 px-2 py-3 text-center text-sm"
              >
                Low
              </button>

              <router-link
                to="/List"
                class="flex w-[25%] justify-center rounded-full border bg-amber-100 px-2 py-3 text-center text-sm"
              >
                <button>Home List</button>
              </router-link>
            </div>
          </header>

          <section class="">
            <h2 class="border-b text-2xl">Were out</h2>
            <div class="flex justify-evenly p-2 font-bold">
              <p class="flex flex-1 justify-start">Category</p>
              <p class="flex flex-1 justify-start">Name</p>
              <p class="flex flex-1 justify-start">Claimed By</p>
            </div>
            <div class="min-h-30 w-full rounded-2xl">
              <div
                v-for="item in outItems"
                :key="item.name"
                class=""
              >
                <div class="flex justify-evenly px-2 py-0.5">
                  <p class="flex flex-1 justify-start">{{ item.category }}</p>
                  <p class="flex flex-1 justify-start">{{ item.name }}</p>
                  <p class="flex flex-1 justify-start">{{ item.claimedBy }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="">
            <h2 class="border-b text-2xl">Low</h2>
            <div class="flex justify-evenly p-2 font-bold">
              <p class="flex flex-1 justify-start">Category</p>
              <p class="flex flex-1 justify-start">Name</p>
              <p class="flex flex-1 justify-start">Claimed By</p>
            </div>
            <div class="min-h-30 w-full rounded-2xl">
              <div
                v-for="item in lowItems"
                :key="item.name"
                class=""
              >
                <div class="flex flex-1 justify-start px-2 py-0.5">
                  <p class="flex flex-1 justify-start">{{ item.category }}</p>
                  <p class="flex flex-1 justify-start">{{ item.name }}</p>
                  <p class="flex flex-1 justify-start">{{ item.claimedBy }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Transition>
    </div>
  </main>
</template>
