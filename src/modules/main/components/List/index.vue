<template>
  <article class="list">
    <section v-if="list.length">
      <section
        :class="`list__item ${item[visibilityKey] ? 'opened' : ''}`"
        v-for="(item,i) in list"
        :key="item.created"
      >
        <div @click="onToggleItemVisibility(item.created)" class="list__item-arrow"></div>
        <div @click="onToggleItemVisibility(item.created)" class="list__item-info">
          <div class="list__item-name">{{item.name}}</div>
          <div v-show="item[visibilityKey]" class="list__item-additional">
            <div v-for="(prop,key) in formattedProps[i]" class="list__item-prop" :key="key">
              <span v-if="prop">{{ key }} : {{ prop }}</span>
            </div>
          </div>
        </div>
        <div class="list__item-cost">{{item.cost_in_credits}}</div>
        <div class="list__item-actions">
          <button
            v-if="!isExistInCart(item.created)"
            :disabled="isNaN(parseInt(item.cost_in_credits))"
            @click="onAddToCart(item)"
            :class="`action primary ${isNaN(parseInt(item.cost_in_credits)) && 'disabled'}`"
          >Add To Cart</button>
          <button
            v-else
            @click="onRemoveFromCart(item.created)"
            class="action danger"
          >Remove From Cart</button>
        </div>
      </section>
    </section>
    <section v-else style="text-align: center; padding: 15px 0;">List is empty</section>
  </article>
</template>

<script>
export default {
  methods: {
    onToggleItemVisibility(created) {
      this.$emit("toggleItemVisibility", created);
    },
    onAddToCart(ship) {
      this.$emit("addItem", ship);
    },
    onRemoveFromCart(created) {
      this.$emit("removeItem", created);
    },
    isExistInCart(created) {
      return this.$store.state.cartItems.some(itm => itm.created === created);
    }
  },
  props: {
    data: Array,
    visibilityKey: String
  },
  computed: {
    list() {
      return this.data;
    },
    formattedProps() {
      return this.data.map(item => {
        return {
          ...item,
          [this.visibilityKey]: undefined,
          name: undefined,
          created: undefined,
          edited: undefined
        };
      });
    }
  }
};
</script>

<style lang="scss">
.list {
  padding-bottom: 50px;
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;

    border-bottom: 1px solid lightgrey;
    position: relative;
    &-name {
      font-weight: bolder;
    }
    &-info {
      flex: 1;
      cursor: pointer;
    }
    &-additional {
      padding: 5px 10px;
      flex: 1;
    }
    &-prop {
      &:not(:empty) {
        border-bottom: 1px solid lightgrey;
      }
    }
    &-actions {
      min-width: 100px;
      margin-left: auto;
      text-align: right;
    }
    &-arrow {
      position: relative;
      padding-left: 30px;
      height: 20px;
      cursor: pointer;
      &:before {
        position: absolute;
        content: "";
        width: 15px;
        height: 15px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background: url("../../../../assets/arrow-right.svg") center no-repeat /
          contain;
        transition: transform 0.1s linear;
      }
    }
    &:last-child {
      border: none;
    }

    &.opened {
      .list__item-arrow:before {
        transform: translateY(-50%) rotate(90deg);
        transition: transform 0.1s linear;
      }
    }
  }
}
</style>