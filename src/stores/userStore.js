import { defineStore } from "pinia";
import data from "../../public/data.json"

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: data,
    currentPage: 1,
    usersPerPage: 10
  }),
  getters: {
    paginatedUsers: (state) => {
      const start = (state.currentPage - 1) * state.usersPerPage;
      const end = start + state.usersPerPage;
      return state.users.slice(start, end);
    }
  },
  actions: {
    nextPage() {
        if (this.currentPage < Math.ceil(this.items.length / this.itemsPerPage)) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      setPage(pageNumber) {
        this.currentPage = pageNumber;
      }
  },
});
