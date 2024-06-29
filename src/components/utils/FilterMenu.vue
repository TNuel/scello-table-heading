<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleMenu"
      class="flex justify-between space-x-4 items-center p-2 border rounded border-borderColor bg-white hover:border-primary active:border-primary w-full shadow-sm px-4 py-2 text-sm font-medium text-textColor hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
    >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_134_770)">
            <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#6D5BD0" />
          </g>
          <defs>
            <clipPath id="clip0_134_770">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h1>
          <span class="text-textColor">Filter</span>
        </h1>
    </button>

    <!-- @click="menuOpen = false" -->
    <div
      v-if="menuOpen"
      class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="px-4 py-2 text-tertiary uppercase text-[12px] font-normal">Sort By:</div>
        <div class="flex flex-col px-4 py-2 space-y-1">
          <label
            v-for="option in sortOptions"
            :key="option.value"
            class="inline-flex justify-between items-center"
          >
          <h2 class="ml-2 text-[14px] font-normal">{{ option.label }}</h2>
            <input
              type="radio"
              :value="option.value"
              v-model="selectedSort"
              class="form-radio h-4 w-4 accent-primary transition duration-150 ease-in-out"
            />
          </label>
        </div>
        <div class="px-4 py-2 text-tertiary uppercase text-[12px] font-normal">Users:</div>
        <div class="flex flex-col px-4 py-2 space-y-1">
          <label
            v-for="option in userOptions"
            :key="option.value"
            class="inline-flex items-center justify-between"
          >
          <h2 class="ml-2 text-[14px] font-normal">{{ option.label }}</h2>
            <input
              type="radio"
              :value="option.value"
              v-model="selectedUser"
              class="form-radio h-4 w-4 accent-primary transition duration-150 ease-in-out"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "FilterMenu",
  setup() {
    const menuOpen = ref(false);
    const selectedSort = ref("default");
    const selectedUser = ref("all");

    const sortOptions = [
      { label: "Default", value: "default" },
      { label: "First Name", value: "firstName" },
      { label: "Last Name", value: "lastName" },
      { label: "Due Date", value: "dueDate" },
      { label: "Last Login", value: "lastLogin" },
    ];

    const userOptions = [
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ];

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return {
      menuOpen,
      selectedSort,
      selectedUser,
      sortOptions,
      userOptions,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
