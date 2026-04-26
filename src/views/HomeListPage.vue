<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useHomeStore } from '@/stores/homeStore'

const homeStore = useHomeStore()
const userStore = useUserStore()
const categoryRefs = ref({})

const statusOrder = {
  out: 0,
  low: 1,
  ok: 2,
}

const sortedCategories = computed(() => {
  return homeStore.categories.map((category) => {
    return {
      name: category.name,
      items: [...category.items].sort((a, b) => {
        return statusOrder[a.status] - statusOrder[b.status]
      }),
    }
  })
})

function scrollToCategory(categoryName) {
  const el = categoryRefs.value[categoryName]

  el?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <main class="flex justify-center p-4">
    <div class="flex max-w-[600px] flex-1 space-y-4 rounded-2xl p-4">
      <div
        class="flex w-full flex-col space-y-4 rounded-2xl border-amber-200 bg-amber-50 p-4 shadow-md shadow-amber-50"
      >
        <header>
          <h1 class="mb-10 text-center text-4xl">NeedIt</h1>
          <div class="flex items-center justify-between">
            <p>{{ userStore.user }}</p>
            <router-link
              to="/Dashboard"
              class="px-3 py-2 underline"
            >
              go back
            </router-link>

            <router-link
              to="/"
              class="px-3 py-2 underline"
            >
              Log out
            </router-link>
          </div>

          <h2 class="text-3xl">Home List</h2>
          <div class="flex justify-between space-x-2 text-sm">
            <button
              v-for="category in sortedCategories"
              :key="category.name"
              class="w-[25%] rounded-2xl border bg-amber-100 px-2 py-2"
              @click="scrollToCategory(category.name)"
            >
              {{ category.name }}
            </button>
          </div>
        </header>

        <div
          v-for="category in sortedCategories"
          :key="category.name"
          :ref="(el) => (categoryRefs[category.name] = el)"
          class="rounded-2xl bg-amber-50 p-3"
        >
          <h3 class="border-b p-2 text-3xl font-bold">{{ category.name }}</h3>

          <div class="flex justify-evenly pl-2 text-xl font-bold">
            <p class="flex flex-1 justify-start">Name</p>
            <p class="flex flex-1 justify-start">Status</p>
          </div>

          <div
            v-for="item in category.items"
            :key="item.name"
            class="flex justify-evenly pl-2"
          >
            <span class="flex flex-1 justify-start">{{ item.name }}</span>
            <span class="flex flex-1 justify-start capitalize">{{ item.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
