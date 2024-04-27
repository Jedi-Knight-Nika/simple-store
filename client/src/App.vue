<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      items: [
        { id: 1, name: "Item One", description: "This is the description for item one." },
        { id: 2, name: "Item Two", description: "This is the description for item two." },
        { id: 3, name: "Item Three", description: "This is the description for item three." },
      ],
    };
  },
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
}

.app-header {
  background: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
}

.card-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  width: 30%;
  margin: 10px;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.app-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
