<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <div class="product-details">
        <h3>{{ product.name }}</h3>
        <button @click="addToCart(product)">Buy Now</button>
      </div>
    </div>
    <CartComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useStore } from "vuex";
import { API } from "../utils/API";
import CartComponent from "../components/CartComponent.vue";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default defineComponent({
  name: "ProductList",
  components: {
    CartComponent,
  },
  setup() {
    const store = useStore();

    const products: Ref<Product[]> = ref([]);

    const fetchProducts = async () => {
      try {
        const response = await API.get("products");

        products.value = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    onMounted(async () => {
      await fetchProducts();
    });

    const addToCart = (product: Product) => {
      store.dispatch("addToCart", { productId: product.id, quantity: 1 });
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
