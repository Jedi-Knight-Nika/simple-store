<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <button @click="addToCart(product)">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ProductList",
  setup() {
    interface Product {
      id: number;
      name: string;
      price: number;
    }

    const products: Ref<Product[]> = ref([]);

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/products");

        products.value = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    onMounted(async () => {
      await fetchProducts();
    });

    const addToCart = (product: any) => {
      console.log("Adding to cart:", product.id);
    };

    return {
      products,
      addToCart,
    };
  },
});
</script>

<style scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.product-card {
  width: 200px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-details h3 {
  font-size: 1.2em;
  color: #333;
}

.product-details p {
  font-size: 1em;
  color: #666;
}
</style>
