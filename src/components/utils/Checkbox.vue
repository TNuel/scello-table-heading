<template>
  <div class="inline-flex items-center" @click="toggle">
    <svg
        v-if="checked"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="3" fill="#6D5BD0" />
      <path
        d="M4.29306 10.7212C3.39997 9.68471 4.75038 8.09982 5.64331 9.13634L8.3843 12.3037L14.3502 5.34088C15.2433 4.29852 16.601 5.88322 15.7079 6.92558L9.06654 14.6727C8.69361 15.1081 8.08874 15.1094 7.71441 14.6749L4.29306 10.7212Z"
        fill="white"
      />
    </svg>
    <svg
    v-else
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
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checked: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    toggle() {
      this.checked = !this.checked;
    },
  },
};
</script>
