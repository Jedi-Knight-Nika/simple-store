<template>
  <transition name="fade">
    <div v-if="showPopup" class="popup" :style="{ backgroundColor: popupSuccess ? 'green' : 'red' }">
      {{ popupMessage }}
    </div>
  </transition>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PopupComponent",
  setup() {
    const store = useStore();
    const showPopup = computed(() => store.getters.showPopup);
    const popupMessage = computed(() => store.getters.popupMessage);
    const popupSuccess = computed(() => store.getters.popupSuccess);

    return { showPopup, popupMessage, popupSuccess };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: white;
  border: 1px solid black;
  z-index: 100;
}
</style>
