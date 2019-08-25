<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__title">
        <router-link to="/">
          <h1>Starship List</h1>
        </router-link>
      </div>
      <div v-show="currentCount" class="header__cart-sum">{{currentSum}}</div>
      <router-link to="/cart">
        <div class="header__cart">
          <div v-show="currentCount" class="header__cart-badge">{{currentCount}}</div>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    currentCount() {
      return this.$store.getters.currentItemsCount;
    },
    currentSum() {
      return this.$store.getters.currentSum;
    }
  }
};
</script>

<style lang="scss">
.header {
  margin-top: 15px;
  margin-bottom: 15px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  a {
    text-decoration: none;
    color: inherit;
  }
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  &__cart-sum {
    margin-left: auto;
    margin-right: 5px;
    padding: 5px;
    background: rgba(0, 0, 0, 0.1);
  }
  &__cart {
    position: relative;
    width: 30px;
    height: 30px;
    background: url("../../assets/cart.svg") center no-repeat / contain;
    &-badge {
      position: absolute;
      padding: 3px;
      width: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 50%;
      right: 0;
      top: 0;
      font-size: 10px;
      color: white;
      font-weight: bolder;
      z-index: 2;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: red;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;

      }
    }
  }
}
</style>