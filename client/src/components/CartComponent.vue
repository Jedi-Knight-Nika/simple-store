<template>
    <div class="cart-icon">
      <!-- <svg viewBox="0 0 24 24" class="icon">
        <path fill="currentColor" d="M7,18 C5.8954305,18 5,18.8954305 5,20 C5,21.1045695 5.8954305,22 7,22 C8.1045695,22 9,21.1045695 9,20 C9,18.8954305 8.1045695,18 7,18 Z M0,0 L0,24 L24,24 L24,0 L0,0 Z M17,18 C15.8954305,18 15,18.8954305 15,20 C15,21.1045695 15.8954305,22 17,22 C18.1045695,22 19,21.1045695 19,20 C19,18.8954305 18.1045695,18 17,18 Z M20.76,5 L6.54,5 L3,15 L19.22,15 L22.76,5 L20.76,5 Z M18.42,7 L5.58,7 L4.16,13 L19.84,13 L18.42,7 Z"></path>
      </svg> -->
      <span v-if="cartItemCount > 0" class="badge">{{ cartItemCount }}</span>
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'CartComponent',
    setup() {
      const store = useStore();
      const cartItemCount = computed(() => store.getters.cartItemCount);
  
      return { cartItemCount };
    },
  });
  </script>
  
  <style scoped>
  .cart-icon {
    position: relative;
    cursor: pointer;
    width: 24px;
    height: 24px;
    background: red; /* remove */
  }
  
  .icon {
    fill: #333;
  }
  
  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
  </style>