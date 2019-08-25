<template>
  <article class="filters">
    <div
      v-for="filter in list"
      :key="filter"
      :class="`filters__item ${isCurrentFilter(filter) ? 'active' : ''}`"
    >
      <router-link :to="{ path: '/', query: { filterBy: filter }}">{{ filter }}</router-link>
    </div>
    <router-link 
      v-if="$route.query['filterBy']"
      :to="{ path: '/', query: {} }">
      <button>reset filter</button>
    </router-link>
  </article>
</template>

<script>
export default {
  methods: {
    isCurrentFilter(filter) {
      return this.$route.query["filterBy"] === filter;
    }
  },
  props: {
    list: Array
  }
};
</script>

<style lang="scss">
.filters {
  display: flex;
  a {
    color: inherit;
  }
  &__item {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid black;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      font-weight: bold;
    }
  }
}
</style>