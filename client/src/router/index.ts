import { createWebHistory, createRouter } from "vue-router";
import CartPage from "@/pages/CartPage.vue";
import HomePage from "@/pages/HomePage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
