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
        Total payable amount: <span class="text-primary"><b>$900.00</b> </span>
        <span>USD</span>
      </div>
    </div>

    <!-- body -->
    <div class="bg-white shadow shadow-shadowColor">
      <div class="flex justify-between p-3 items-center">
        <div class="flex space-x-8 w-1/2">
          <!-- Filter -->
          <div class="flex space-x-4">
            <div
              class="flex justify-between space-x-2 items-center p-2 border rounded border-borderColor bg-white"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_134_770)">
                  <path
                    d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z"
                    fill="#25213B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_134_770">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h3>
                <span class="text-textColor">Filter</span>
              </h3>
            </div>
          </div>
          <!-- Search -->
          <search-input class="w-full"></search-input>
        </div>
        <!-- button -->
        <Button variant="primary" size="md" @click="handleClick"
          ><h2 class="font-semibold px-2 py-1">PAY DUES</h2></Button
        >
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-bgColor">
            <tr class="text-left text-textColor font-normal border-b">
              <th class="py-2 px-4 border-b">
                <div>
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
                  </svg>
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
              <th class="font-normal py-2 px-4">
                <h1>Amount</h1>
              </th>
              <th class="py-2 px-4">
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
            <template v-for="user in filteredUsers" :key="user.name">
              <tr class="hover:bg-gray-100 text-left">
                <td class="py-2 px-4 border-b">
                  <div class="flex items-center space-x-8">
                    <svg
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
                    </svg>
                    <div class="cursor-pointer">
                      <img
                        v-if="!user.showDetails"
                        @click="toggleDetails(user.id)"
                        src="../assets/icons-svg/circle-down-icon.svg"
                        alt="down icon"
                      />
                      <img
                        v-if="user.showDetails"
                        @click="toggleDetails(user.id)"
                        src="../assets/icons-svg/circle-up-icon.svg"
                        alt="up icon"
                      />
                    </div>
                  </div>
                </td>
                <td class="py-2 px-4 border-b">
                  <div>{{ user.name }}</div>
                  <div class="text-sm text-gray-600">{{ user.email }}</div>
                </td>
                <td class="py-2 px-4 border-b">
                  <span
                    :class="user.userStatus.color"
                    class="px-2 py-1 rounded-md text-white"
                    >{{ user.userStatus.status }}</span
                  >
                  <div class="text-sm text-gray-600">
                    Last login: {{ user.lastLogin }}
                  </div>
                </td>
                <td class="py-2 px-4 border-b">
                  <span
                    :class="user.paymentStatus.color"
                    class="px-2 py-1 rounded-md text-white"
                    >{{ user.paymentStatus.status }}</span
                  >
                  <div class="text-sm text-gray-600">
                    {{ user.paymentDate }}
                  </div>
                </td>
                <td class="py-2 px-4 border-b">
                  <div>{{ user.amount }} USD</div>
                  <button class="text-blue-600 text-sm">View More</button>
                </td>
                <td>
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
                </td>
              </tr>
              <tr v-if="user.showDetails" class="bg-gray-50">
                <td colspan="5" class="py-2 px-4">
                  <table class="w-10/12 mx-auto">
                    <thead>
                      <tr class="text-left uppercase">
                        <th class="py-2 px-4 border-b font-normal">Date</th>
                        <th class="py-2 px-4 border-b font-normal">
                          User Activity
                        </th>
                        <th
                          class="py-2 px-4 border-b flex items-center font-normal"
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
                      <template
                      v-for="activity in user.activities"
                        :key="activity.date"
                      
                      >
                      <tr v-if="user.activities.length == 0">
                        <td colspan="3" class="uppercase p-4 text-center flex justify-center items-center w-full bg-red-300">
                          <h1 class="font-semibold text-textColor">No Record Found</h1>
                        </td>
                      </tr>
                        <tr v-if="user.activities" class="text-left">
                          <td class="py-2 px-4 border-b">
                            {{ activity.date }}
                          </td>
                          <td class="py-2 px-4 border-b">
                            {{ activity.activity }}
                          </td>
                          <td class="py-2 px-4 border-b">
                            {{ activity.detail }}
                          </td>
                        </tr>
                      </template>
                      
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "./utils/ButtonComponent.vue";
import SearchInput from "./utils/SearchInput.vue";

const search = ref("");
const activeTab = ref("All");
const tabs = ref(["All", "Paid", "Unpaid", "Overdue"]);
const users = ref([
  {
    id: 1,
    name: "Justin Septimus",
    email: "example@email.com",
    userStatus: { status: "Active", color: "bg-green-500" },
    lastLogin: "14/APR/2020",
    paymentStatus: { status: "Paid", color: "bg-green-500" },
    paymentDate: "Paid on 15/APR/2020",
    amount: 200,
    showDetails: false,
  },
  {
    id: 2,
    name: "Justin Septimus",
    email: "example@email.com",
    userStatus: { status: "Active", color: "bg-green-500" },
    lastLogin: "14/APR/2020",
    paymentStatus: { status: "Paid", color: "bg-green-500" },
    paymentDate: "Paid on 15/APR/2020",
    amount: 200,
    showDetails: false,
    activities: [
      {
        date: "12/APR/2020",
        activity: "Lorem ipsum dolor sit amet",
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies justo et lacus fringilla bibendum.",
      },
      {
        date: "11/APR/2020",
        activity: "Lorem ipsum dolor sit amet",
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies justo et lacus fringilla bibendum.",
      },
    ],
  },
  {
    id: 3,
    name: "Anika Rhiel Madsen",
    email: "example@email.com",
    userStatus: { status: "Active", color: "bg-green-500" },
    lastLogin: "14/APR/2020",
    paymentStatus: { status: "Overdue", color: "bg-red-500" },
    paymentDate: "Dued on 15/APR/2020",
    amount: 300,
    showDetails: false,
    activities: [
      {
        date: "10/APR/2020",
        activity: "Lorem ipsum dolor sit amet",
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies justo et lacus fringilla bibendum.",
      },
      {
        date: "09/APR/2020",
        activity: "Lorem ipsum dolor sit amet",
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies justo et lacus fringilla bibendum.",
      },
    ],
  },
  // Add more user data as needed
]);
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase());
    const tabMatch =
      activeTab.value === "All" ||
      user.value.paymentStatus.status.toLowerCase() ===
        activeTab.value.toLowerCase();
    return searchMatch && tabMatch;
  });
});

const handleClick = () => {
  console.log("clicked");
};

const toggleDetails = (index) => {
  console.log("show details", index);
  users.value[index - 1].showDetails = !users.value[index - 1].showDetails;
};
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
