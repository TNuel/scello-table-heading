<template>
  <div
    class="flex items-center justify-end space-x-12 p-4 bg-gray-100 border-t border-gray-300"
  >
    <div class="flex items-center text-tertiary font-semibold text-[12px]">
      <span>Rows per page:</span>
      <select
        v-model="rowsPerPage"
        @change="updatePage"
        class="ml-2"
      >
        <option
          v-for="option in rowsPerPageOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="flex items-center space-x-8">
      <span class="text-tertiary font-semibold text-[12px]">{{ startItem }} of {{ endItem }} of {{ totalItems }}</span>
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="ml-4 px-2 py-1  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="../../assets/icons-svg/left-icon.svg" alt="left-icon">
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="ml-2 px-2 py-1  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img src="../../assets/icons-svg/right.svg" alt="right-icon">
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    initialRowsPerPage: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    const rowsPerPageOptions = ref([5, 10, 20, 50, 100]);
    const currentPage = ref(1);
    const rowsPerPage = ref(props.initialRowsPerPage);

    const totalPages = computed(() =>
      Math.ceil(props.totalItems / rowsPerPage.value)
    );
    const startItem = computed(
      () => (currentPage.value - 1) * rowsPerPage.value + 1
    );
    const endItem = computed(() =>
      Math.min(currentPage.value * rowsPerPage.value, props.totalItems)
    );

    const updatePage = () => {
      currentPage.value = 1;
      emit("update:rowsPerPage", rowsPerPage.value);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        emit("update:page", currentPage.value);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        emit("update:page", currentPage.value);
      }
    };

    return {
      rowsPerPageOptions,
      currentPage,
      rowsPerPage,
      totalPages,
      startItem,
      endItem,
      updatePage,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
