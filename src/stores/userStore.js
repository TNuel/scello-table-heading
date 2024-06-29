import { defineStore } from "pinia";
import data from "../../public/data.json"

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: data,
  }),
  getters: {
    getItemById: (state) => (id) => {
      return state.users.find(item => item.id === id);
    },
    // Other getters as needed
  },
  actions: {
    setUser(users) {
        this.users = users
    },
    async fetchData() {
      try {
        
        const response = await fetch("/user.json"); // Adjust the path as per your project structure
        const data = await response.json();
        console.log(data);
        this.users = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    addUser(user) {
      this.users.push(user);
    },
    updateUser(index, updatedUser) {
      this.users[index] = updatedUser;
    },
    removeUser(index) {
      this.users.splice(index, 1);
    },
  },
});
