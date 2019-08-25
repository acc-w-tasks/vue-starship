import Vue from 'vue'
import Vuex from 'vuex'
import cartStorage from './mixins/localStorageMixin'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shipList: [],
    cartItems: cartStorage.methods.getCartStorage() || [],
    cartSum: 0
  },
  getters: {
    currentItemsCount: state => state.cartItems.length,
    currentSum: state => {
      return state.cartItems.reduce((acc,itm) => acc += parseInt(itm.cost_in_credits),0)
    }
  },
  mutations: {
    setShipList: (state, list) => state.shipList = list,
    setCartItems: (state, cartItems) => state.cartItems = cartItems,
    clearCartItems: state => {
      cartStorage.methods.clearCartStorage()
      state.cartItems = []
    },
    removeItemFromCart: (state, created) => {
      const shipIndex = state.cartItems.findIndex(itm => itm.created === created)
      cartStorage.methods.removeFromCartStorage(created)
      if(shipIndex !== -1){
        return state.cartItems.splice(shipIndex,1)
      }
    },
    addItemToCart: (state, item) => {
      state.cartItems.push(item)
      cartStorage.methods.addToCartStorage(item)
    }
  }
})
