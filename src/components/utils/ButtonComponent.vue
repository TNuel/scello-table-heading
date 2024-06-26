<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

  const prop = defineProps({
    type: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "md",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });
    const buttonClasses = computed(() => {
      const baseClasses =
        "font-inter font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2";
      const variantClasses = {
        primary: "bg-primary/80 text-white rounded-[6px] hover:bg-primarry focus:ring-primary",
        secondary:
          "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      };
      const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-2 text-base",
        lg: "px-6 py-3 text-lg",
      };
      return `${baseClasses} ${variantClasses[prop.variant]} ${
        sizeClasses[prop.size]
      }`;
    });

    defineEmits({
    // no validation
    handleClick: null,

    // with validation
    // submit: (payload) => {
    //   if (payload.email && payload.password) {
    //     return true
    //   } else {
    //     console.warn(`Invalid submit event payload!`)
    //     return false
    //   }
    // }
  });
    // const handleClick= (event) => {
    //   emit("click", event);
    // };
</script>

<style scoped>
/* Custom styles if needed */
</style>
