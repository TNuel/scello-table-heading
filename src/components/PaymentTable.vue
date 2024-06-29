<template>
  <div class="p-4">
    <!-- Header -->
    <h1 class="font-inter text-textColor font-bold tracking-wider text-left">
      TABLE HEADING
    </h1>
    <!-- Tab -->
    <div
      class="flex justify-between items-center mb-4 border-b border-b-borderColor"
    >
      <div class="flex space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-4 py-2"
          :class="{
            'border-b-2 border-b-textColor font-bold': activeTab === tab,
            'font-medium': activeTab !== tab,
          }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="text-[14px]">
        Total payable amount:
        <span class="text-primary"
          ><b>${{ totalAmountPayable }}</b>
        </span>
        <span>USD</span>
      </div>
    </div>

    <!-- body -->
    <div class="bg-white shadow shadow-shadowColor">
      <div class="flex justify-between p-3 items-center">
        <div class="flex space-x-8 w-1/2">
          <!-- Filter -->
          <FilterMenu />
          <!-- Search -->
          <search-input
            v-model:searchQuery="searchTerm"
            class="w-full"
          ></search-input>
        </div>
        <!-- button -->
        <Button variant="primary" size="md" @click="markAsPaid"
          ><h2 class="font-semibold px-1 py-2">PAY DUES</h2></Button
        >
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-bgColor">
            <tr class="text-left text-textColor font-normal border-b">
              <th class="py-2 px-4 border-b">
                <div>
                  <!-- <input
                    type="checkbox"
                    @change="toggleSelectAll"
                    :checked="isAllSelected"
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.75"
                      y="0.75"
                      width="18.5"
                      height="18.5"
                      rx="2.25"
                      stroke="#8B83BA"
                      stroke-width="1.5"
                    />
                  </svg> -->
                  <Checkbox
                    @update:modelValue="toggleSelectAll"
                    :modelValue="isAllSelected"
                  />
                </div>
              </th>
              <th class="font-normal py-2 px-4">
                <h1>Name</h1>
              </th>
              <th class="font-normal py-2 px-4">
                <h1>User Status</h1>
              </th>
              <th class="font-normal py-2 px-4">
                <h1>Payment Status</h1>
              </th>
              <th class="font-normal text-right py-2 px-4">
                <h1>Amount</h1>
              </th>
              <th class="py-2 px-4 flex justify-end">
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99286 7.80488C11.1833 7.80488 12.1357 8.78049 12.1357 10C12.1357 11.2195 11.1833 12.1951 9.99286 12.1951C8.80239 12.1951 7.85001 11.2195 7.85001 10C7.85001 8.78049 8.80239 7.80488 9.99286 7.80488ZM7.85001 2.19512C7.85001 3.41463 8.80239 4.39024 9.99286 4.39024C11.1833 4.39024 12.1357 3.41463 12.1357 2.19512C12.1357 0.97561 11.1833 0 9.99286 0C8.80239 0 7.85001 0.97561 7.85001 2.19512ZM7.85001 17.8049C7.85001 19.0244 8.80239 20 9.99286 20C11.1833 20 12.1357 19.0244 12.1357 17.8049C12.1357 16.5854 11.1833 15.6098 9.99286 15.6098C8.80239 15.6098 7.85001 16.5854 7.85001 17.8049Z"
                      fill="#8B83BA"
                    />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(user, id) in filteredUsers" :key="id">
              <tr
                :class="{ 'bg-bgColor': isActiveRow(id) }"
                @click="setActiveRow(id)"
                @mouseenter="setFocusedRow(id)"
                @mouseleave="clearFocusedRow"
                class="hover:bg-gray-100 text-left"
              >
                <td class="py-2 px-4 border-b">
                  <div class="flex items-center space-x-8">
                    <!-- <svg
                      width="20"
                      height="20"
                      class="cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.75"
                        y="0.75"
                        width="18.5"
                        height="18.5"
                        rx="2.25"
                        stroke="#8B83BA"
                        stroke-width="1.5"
                      />
                    </svg> -->
                    <Checkbox
                      :modelValue="selectedUsers.includes(user)"
                      @update:modelValue="
                        (value) => updateSelectedUsers(value, user)
                      "
                    />
                    <div class="cursor-pointer">
                      <img
                        v-if="!user.showDetails"
                        @click="toggleDetails(user.id - 1)"
                        src="../assets/icons-svg/circle-down-icon.svg"
                        alt="down icon"
                      />
                      <img
                        v-if="user.showDetails"
                        @click="toggleDetails(user.id - 1)"
                        src="../assets/icons-svg/circle-up-icon.svg"
                        alt="up icon"
                      />
                    </div>
                  </div>
                </td>
                <td class="py-2 px-4 border-b">
                  <div class="text-sm font-medium text-textColor">
                    {{ user.name }}
                  </div>
                  <div class="text-tertiary text-xs font-normal">
                    {{ user.email }}
                  </div>
                </td>
                <td class="py-2 px-4 border-b">
                  <span
                    :class="{
                      'bg-[#4A4AFF]/10 text-[#4A4AFF]':
                        user.userStatus.status === 'Active',
                      'bg-textColor/10 text-tertiary ':
                        user.userStatus.status === 'Inactive',
                      'bg-yellow-100 text-yellow-500':
                        user.userStatus.status === 'Unpaid',
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <b class="text-4xl -mt-6">.</b>
                    {{ user.userStatus.status }}</span
                  >
                  <div class="text-sm text-tertiary font-medium">
                    Last login: {{ user.lastLogin }}
                  </div>
                </td>
                <td class="py-2 px-4 border-b">
                  <span
                    :class="{
                      'bg-secondary/20 text-secondary':
                        user.paymentStatus.status === 'Paid',
                      'bg-negative/20 text-negative':
                        user.paymentStatus.status === 'Overdue',
                      'bg-[#965E00]/20 text-[#965E00]':
                        user.paymentStatus.status === 'Unpaid',
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    <b class="text-4xl -mt-6">.</b>
                    {{ user.paymentStatus.status }}</span
                  >
                  <div class="text-sm text-textColor text-[12px] font-medium">
                    {{ user.paymentDate }}
                  </div>
                </td>
                <td class="py-2 px-4 text-right border-b">
                  <div class="text-textColor text-sm font-medium">
                    ${{ user.amount }}
                  </div>
                  <div class="text-tertiary text-xs font-normal">USD</div>
                </td>
                <td class="py-2 px-4 border-b">
                  <div class="flex justify-between">
                    <button class="text-tertiary text-sm">View More</button>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99286 7.80488C11.1833 7.80488 12.1357 8.78049 12.1357 10C12.1357 11.2195 11.1833 12.1951 9.99286 12.1951C8.80239 12.1951 7.85001 11.2195 7.85001 10C7.85001 8.78049 8.80239 7.80488 9.99286 7.80488ZM7.85001 2.19512C7.85001 3.41463 8.80239 4.39024 9.99286 4.39024C11.1833 4.39024 12.1357 3.41463 12.1357 2.19512C12.1357 0.97561 11.1833 0 9.99286 0C8.80239 0 7.85001 0.97561 7.85001 2.19512ZM7.85001 17.8049C7.85001 19.0244 8.80239 20 9.99286 20C11.1833 20 12.1357 19.0244 12.1357 17.8049C12.1357 16.5854 11.1833 15.6098 9.99286 15.6098C8.80239 15.6098 7.85001 16.5854 7.85001 17.8049Z"
                        fill="#8B83BA"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr v-if="user.showDetails" class="bg-bgColor/80">
                <td colspan="6" class="">
                  <table class="w-11/12">
                    <thead>
                      <tr class="text-left uppercase border-b">
                        <th class="py-2 px-4 text-sm font-normal">Date</th>
                        <th class="py-2 px-4 text-sm font-normal">
                          User Activity
                        </th>
                        <th
                          class="py-2 px-4 text-sm flex items-center font-normal"
                        >
                          Detail
                          <span>
                            <img
                              class="mx-3"
                              src="../assets/icons-svg/info-icon.svg"
                              alt="info-icon"
                            />
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="user.activities">
                        <tr
                          v-for="activity in user.activities"
                          :key="activity.date"
                          class="text-left"
                        >
                          <td class="py-2 text-sm px-4 border-b">
                            {{ activity.date }}
                          </td>
                          <td class="py-2 text-sm px-4 border-b">
                            {{ activity.activity }}
                          </td>
                          <td class="py-2 text-sm px-4 border-b">
                            {{ activity.detail }}
                          </td>
                        </tr>
                      </template>
                      <tr v-if="user.activities.length < 1">
                        <td colspan="6" class="uppercase p-4">
                          <h1 class="font-semibold text-tertiary">
                            No Record Found
                          </h1>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <PaginationVue
          :totalItems="totalItems"
          @update:rowsPerPage="handleRowsPerPageUpdate"
          @update:page="handlePageUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

import Button from "./utils/ButtonComponent.vue";
import Checkbox from "./utils/Checkbox.vue";
import FilterMenu from "./utils/FilterMenu.vue";
import PaginationVue from "./utils/Pagination.vue";
import SearchInput from "./utils/SearchInput.vue";

const store = useUserStore();
const searchTerm = ref("");
const activeTab = ref("All");
const tabs = ref(["All", "Paid", "Unpaid", "Overdue"]);
const selectedUsers = ref([]);
const isChecked = ref(false);

const activeRow = ref(null);
const focusedRow = ref(null);
const currentPage = store.$state.currentPage;
const itemsPerPage = store.$state.usersPerPage;

const setActiveRow = (id) => {
  activeRow.value = id;
};

const setFocusedRow = (id) => {
  focusedRow.value = id;
};

const clearFocusedRow = () => {
  focusedRow.value = null;
};

const isActiveRow = (id) => {
  return id === activeRow.value || id === focusedRow.value;
};
const totalItems = store.users.length;

const totalPage = Math.ceil(totalItems / itemsPerPage);

const handleRowsPerPageUpdate = (rowsPerPage) => {
  // Handle the rows per page update
  console.log("Rows per page updated to:", rowsPerPage);
};

const handlePageUpdate = (page) => {
  // Handle the page update
  console.log("Page updated to:", page);
};

const users = store.paginatedUsers;
console.log(store.paginatedUsers);
const filteredUsers = computed(() => {
  let filtered = users;
  console.log(users);
  if (!searchTerm.value) {
    return filtered;
  }
  if (activeTab.value !== "all") {
    filtered = users.filter(
      (user) => user.paymentStatus.status.toLowerCase() === activeTab.value
    );
  }
  if (searchTerm.value) {
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
  return filtered;
});

const toggleDetails = (id) => {
  console.log("show details", id);
  users[id].showDetails = !users[id].showDetails;
};

const toggleSelectAll = (value) => {
  if (value) {
    selectedUsers.value = [...paginatedAndFilteredUsers.value];
  } else {
    selectedUsers.value = [];
  }
};

const updateSelectedUsers = (value, user) => {
  if (value) {
    selectedUsers.value.push(user);
  } else {
    selectedUsers.value = selectedUsers.value.filter((u) => u !== user);
  }
};

const isAllSelected = computed(() => {
  return selectedUsers.value.length === paginatedAndFilteredUsers.value.length;
});

const paginatedAndFilteredUsers = computed(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return store.paginatedUsers.slice(startIndex, endIndex);
});

const totalAmountPayable = computed(() => {
  return paginatedAndFilteredUsers.value.reduce((sum, user) => {
    if (
      user.paymentStatus.status === "Unpaid" ||
      user.paymentStatus.status === "Overdue"
    ) {
      return sum + user.amount;
    }
    return sum;
  }, 0);
});

const markAsPaid = () => {
console.log('changing unpaid to paid');
  selectedUsers.value.forEach((user) => {
    if (
      user.paymentStatus.status === "Unpaid" ||
      user.paymentStatus.status === "Overdue"
    ) {
      user.paymentStatus.status = "Paid";
      user.paymentStatus.color = "bg-green-500";
      user.paymentDate = "Paid on " + new Date().toLocaleDateString();
    }
  });
  selectedUsers.value = [];
};

// const totalAmountForPage = computed(() => {
//   return users.value.reduce((sum, user) => sum + user.amount, 0);
// });
</script>

<style scoped>
.table-header {
  font-weight: bold;
  border-bottom: 1px solid #e5e7eb;
}
.table-cell {
  border-bottom: 1px solid #e5e7eb;
}
.bg-green-500 {
  background-color: #48bb78;
}
.bg-red-500 {
  background-color: #f56565;
}
</style>
