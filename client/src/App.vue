<template>
  <div>
    <router-view></router-view>
    <PopupComponent />
  </div>
</template>

<script>
import PopupComponent from "./components/PopupComponent.vue";

export default {
  name: "App",
  components: {
    PopupComponent,
  },
};
</script>
