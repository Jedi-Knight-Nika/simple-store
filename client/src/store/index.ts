import { API } from "@/utils/API";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      cartItemCount: 0,
      popup: {
        message: "",
        show: false,
        isSuccess: true,
      },
    };
  },
  mutations: {
    incrementCartItemCount(state) {
      state.cartItemCount += 1;
    },
    decrementCartItemCount(state) {
      if (state.cartItemCount > 0) {
        state.cartItemCount--;
      }
    },
    setPopupMessage(state, message) {
      state.popup.message = message;
    },
    setShowPopup(state, show) {
      state.popup.show = show;
    },
    setPopupSuccess(state, isSuccess) {
      state.popup.isSuccess = isSuccess;
    },
  },
  actions: {
    async fetchCartItems({ commit }) {
      try {
        const response = await API.get("carts");
        commit("setCartItems", response.data.items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    },
    async addToCart({ commit }, { productId, quantity }) {
      try {
        await API.post("carts", {
          productId,
          quantity,
        }).then(() => {
          commit("incrementCartItemCount");
          commit("setPopupMessage", "Item added");
          commit("setPopupSuccess", true);
        });
      } catch (error) {
        console.error("Error adding to cart:", error);

        commit("setPopupMessage", "Error adding to cart");
        commit("setPopupSuccess", false);
      }

      commit("setShowPopup", true);
      setTimeout(() => {
        commit("setShowPopup", false);
      }, 3000);
    },
    async removeItemFromCart({ commit }, { productId }) {
      try {
        await API.delete(`cart/${productId}`);
        commit("decrementCartItemCount");
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    },
  },
  getters: {
    cartItemCount(state) {
      return state.cartItemCount;
    },
    popupMessage(state) {
      return state.popup.message;
    },
    showPopup(state) {
      return state.popup.show;
    },
    popupSuccess(state) {
      return state.popup.isSuccess;
    },
  },
});

export default store;
