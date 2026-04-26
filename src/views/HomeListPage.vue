<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useHomeStore } from '@/stores/homeStore'

const homeStore = useHomeStore()
const userStore = useUserStore()
const categoryRefs = ref({})
const showItemModal = ref(false)
const selectedCategory = ref('')
const editingItem = ref(null)

const itemForm = ref({
  name: '',
  status: 'low',
  claimedBy: '',
})

function openAddItem(categoryName) {
  selectedCategory.value = categoryName
  editingItem.value = null

  itemForm.value = {
    name: '',
    status: 'low',
    claimedBy: '',
  }

  showItemModal.value = true
}

function openUpdateItem(categoryName, item) {
  selectedCategory.value = categoryName
  editingItem.value = item.name

  itemForm.value = {
    name: item.name,
    status: item.status,
    claimedBy: item.claimedBy,
  }

  showItemModal.value = true
}

function saveItem() {
  if (editingItem.value) {
    homeStore.updateItem(selectedCategory.value, editingItem.value, itemForm.value)
  } else {
    homeStore.addItem(
      selectedCategory.value,
      itemForm.value.name,
      itemForm.value.status,
      itemForm.value.claimedBy,
    )
  }

  showItemModal.value = false
}

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
        class="flex w-full flex-col rounded-2xl border-amber-200 bg-amber-50 p-4 shadow-md shadow-amber-50"
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

          <h2 class="text-4xl font-bold">Home List</h2>

          <div class="mt-4 flex justify-between space-x-2 text-sm">
            <button
              v-for="category in homeStore.sortedCategories"
              :key="category.name"
              class="w-[25%] rounded-2xl border bg-amber-100 px-2 py-2"
              @click="scrollToCategory(category.name)"
            >
              {{ category.name }}
            </button>
          </div>
        </header>

        <div
          v-for="category in homeStore.sortedCategories"
          :key="category.name"
          :ref="(el) => (categoryRefs[category.name] = el)"
          class="rounded-2xl bg-amber-50 p-3"
        >
          <div class="flex justify-start space-x-10 border-b p-2">
            <h3 class="text-3xl font-bold">{{ category.name }}</h3>
            <button @click="openAddItem(category.name)">+ Add Item</button>
          </div>

          <div class="flex justify-evenly pl-2 text-xl font-bold">
            <p class="flex flex-2 justify-start">Name</p>
            <p class="flex flex-2 justify-start">Status</p>
            <p class="flex flex-1 justify-start">Actions</p>
          </div>

          <div
            v-for="item in category.items"
            :key="item.name"
          >
            <div class="flex justify-evenly pl-2">
              <span class="flex flex-2 justify-start">{{ item.name }}</span>
              <span class="flex flex-2 justify-start capitalize">{{ item.status }}</span>
              <button
                class="flex flex-1 justify-start"
                @click="openUpdateItem(category.name, item)"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="showItemModal"
          class="fixed inset-0 flex items-center justify-center bg-black/40 p-4"
        >
          <div class="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg">
            <h2 class="mb-4 text-xl font-bold">
              {{ editingItem ? 'Update Item' : 'Add Item' }}
            </h2>

            <input
              v-model="itemForm.name"
              class="mb-3 w-full rounded border p-2"
              placeholder="Item name"
            />

            <select
              v-model="itemForm.status"
              class="mb-3 w-full rounded border p-2"
            >
              <option value="out">Out</option>
              <option value="low">Low</option>
              <option value="ok">OK</option>
            </select>

            <input
              v-model="itemForm.claimedBy"
              class="mb-4 w-full rounded border p-2"
              placeholder="Claimed by"
            />

            <div class="flex justify-end gap-2">
              <button @click="showItemModal = false">Cancel</button>
              <button @click="saveItem">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
