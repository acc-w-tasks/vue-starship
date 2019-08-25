<template>
  <div class="cart">
    <h1>Cart</h1>
    <List
      :data="cartItems"
      :visibilityKey="'isOpened'"
      @toggleItemVisibility="toggleItemVisibility"
      @removeItem="onRemove"
    />
    <div v-if="cartItems.length" class="buy">
      <button class="primary" @click="toggleModalVisibility(true)">Buy</button>
    </div>
    <transition name="fade">
      <Modal
        v-if="isModalVisible"
        @close="toggleModalVisibility(false)"
        @modalSubmit="onModalHide"
      />
    </transition>
  </div>
</template>

<script>
import List from "../main/components/List";

export default {
  data() {
    return {
      cartItems: [],
      isModalVisible: false
    };
  },
  created() {
    this.cartItems = this.storageData;
  },
  components: {
    List,
    Modal: () => import('../../components/Modal')
  },
  methods: {
    onModalHide() {
      this.$store.commit('clearCartItems')
      this.toggleModalVisibility(false);
      this.$router.push("/");
    },
    toggleModalVisibility(state) {
      this.isModalVisible = state;
    },
    toggleItemVisibility(createdProp) {
      const ship = this.cartItems.find(
        ({ created }) => created === createdProp
      );
      const shipIndex = this.cartItems.findIndex(itm => itm === ship);
      this.cartItems[shipIndex].isOpened = !this.cartItems[shipIndex].isOpened;
    },
    onRemove(createdProp) {
      this.cartItems.splice(
        this.cartItems.findIndex(({ created }) => created === createdProp),
        1
      );
      this.$store.commit("removeItemFromCart", createdProp);
    },
    decorateShipInstance(ship) {
      ship.isOpened = false;
      return ship;
    }
  },
  computed: {
    storageData() {
      return this.getCartStorage().map(this.decorateShipInstance);
    }
  }
};
</script>

<style lang="scss">
.cart {
  .buy {
    button {
      padding: 15px;
      font-size: 1.2rem;
    }
  }
}
</style>