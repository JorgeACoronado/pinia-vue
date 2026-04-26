import { defineStore } from 'pinia'
import { reactive, toRef, toRefs } from 'vue'

export const useHomeStore = defineStore('home', () => {
  const state = reactive({
    categories: [
      {
        name: 'Dairy',
        items: [
          { name: 'Milk', status: 'low', claimedBy: 'Mary' },
          { name: 'Cheese', status: 'out', claimedBy: 'George' },
        ],
      },
      {
        name: 'Produce',
        items: [
          { name: 'Lettuce', status: 'low', claimedBy: 'John' },
          { name: 'Tomatoes', status: 'out', claimedBy: 'Jane' },
        ],
      },
    ],
  })

  return {
    ...toRefs(state),
  }
  // ---to keep scope low, I will comment out the actions section and add it later---

  // actions: {
  //   addCategory(name) {
  //     this.categories.push({ name, items: [] })
  //   },

  //   addItem(categoryName, itemName) {
  //     const category = this.categories.find((c) => c.name === categoryName)
  //     if (category) {
  //       category.items.push({ name: itemName, status: 'pending' })
  //     }
  //   },

  //   updateItemStatus(categoryName, itemName, status) {
  //     const category = this.categories.find((c) => c.name === categoryName)
  //     if (!category) return

  //     const item = category.items.find((i) => i.name === itemName)
  //     if (item) item.status = status
  //   },

  //   removeItem(categoryName, itemName) {
  //     const category = this.categories.find((c) => c.name === categoryName)
  //     if (!category) return

  //     category.items = category.items.filter((i) => i.name !== itemName)
  //   },
  // },
})
