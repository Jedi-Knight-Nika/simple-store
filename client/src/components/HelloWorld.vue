<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
</style>
