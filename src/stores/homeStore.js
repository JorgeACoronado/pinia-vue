import { defineStore } from 'pinia'

const statusOrder = {
  out: 0,
  low: 1,
  ok: 2,
}

export const useHomeStore = defineStore('home', {
  state: () => ({
    categories: [
      {
        name: 'Food',
        items: [
          { name: 'Milk', status: 'low', claimedBy: 'Mary' },
          { name: 'Cheese', status: 'out', claimedBy: 'George' },
        ],
      },
      {
        name: 'Pets',
        items: [
          { name: 'Pedigree', status: 'low', claimedBy: 'John' },
          { name: 'shampoo', status: 'out', claimedBy: 'Jane' },
        ],
      },
      {
        name: 'Home Essentials',
        items: [{ name: 'Paper towels', status: 'ok', claimedBy: '' }],
      },
      {
        name: 'Garden',
        items: [{ name: 'Dawn', status: 'out', claimedBy: '' }],
      },
    ],
  }),

  getters: {
    sortedCategories: (state) => {
      return state.categories.map((category) => {
        return {
          name: category.name,
          items: [...category.items].sort((a, b) => {
            return statusOrder[a.status] - statusOrder[b.status]
          }),
        }
      })
    },
  },

  actions: {
    addItem(categoryName, itemName, status, claimedBy) {
      const category = this.categories.find((c) => c.name === categoryName)

      if (category) {
        category.items.push({
          name: itemName,
          status,
          claimedBy,
        })
      }
    },

    updateItem(categoryName, oldItemName, updatedItem) {
      const category = this.categories.find((c) => c.name === categoryName)
      if (!category) return

      const item = category.items.find((i) => i.name === oldItemName)
      if (!item) return

      item.name = updatedItem.name
      item.status = updatedItem.status
      item.claimedBy = updatedItem.claimedBy
    },
  },
})
