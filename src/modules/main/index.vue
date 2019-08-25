<template>
  <article>
    <section class="options">
      <Filters :list="filtersList" />
      <div class="search">
        <input
          v-model="search"
          @keyup="throttledKeyUp"
          type="text"
          placeholder="Search by name or model"
        />
      </div>
    </section>
    <List
      v-if="isLoaded"
      @toggleItemVisibility="toggleItemVisibility"
      @addItem="onAddItem"
      @removeItem="onRemoveItem"
      :visibilityKey="'isOpened'"
      :data="list"
    />
    <section v-else class="loading">
      <div class="loading__img">
        <img src="../../assets/loader.svg" alt="loader" />
      </div>
      <div class="loading__text">Loading {{loadingProcess}}%</div>
    </section>
  </article>
</template>

<script>
import Filters from "./components/Filters";
import List from "./components/List/index";
import Axios from "axios";
import debounce from "lodash.debounce";
export default {
  data() {
    return {
      list: [],
      isLoaded: false,
      loadingProcess: 0,
      search: "",
      lastSearch: "",
      filtersList: ["cost_in_credits", "hyperdrive_rating"]
    };
  },
  created() {
    //one min in ms
    const INTERVAL = 60000;

    if (!this.shipList.length) {
      this.fetchShips();
    } else {
      this.list = this.shipList;
      this.isLoaded = true;
    }

    setInterval(async () => {
      const shipsResponse = await Axios.get("/starships");

      // check if ship list was updated
      if (shipsResponse.data.count !== this.shipList.length) {
        this.fetchShips();
      }
    }, INTERVAL);
  },
  methods: {
    async fetchShips() {
      let page = 1;
      while (true) {
        try {
          const shipsResponse = await Axios.get(`/starships?page=${page}`);
          const countPages = Math.ceil(shipsResponse.data.count / 10);
          const { results, next } = shipsResponse.data;

          this.list.push(...results.map(this.decorateShipInstance));
          this.$store.commit("setShipList", this.list);

          // if it was last page
          if (!next) {
            if(this.$route.query['filterBy']){
              this.list = this.filteredByProp(this.$route.query['filterBy'])
            }
            this.isLoaded = true;
            return false;
          }

          page++;
          this.loadingProcess = (page * 100) / countPages;
        } catch (err) {
          console.log("err during ships fetch");
          return false;
        }
      }
    },
    toggleItemVisibility(createdProp) {
      const ship = this.list.find(({ created }) => created === createdProp);
      const shipIndex = this.list.findIndex(itm => itm === ship);
      this.list[shipIndex].isOpened = !this.list[shipIndex].isOpened;
    },
    onAddItem(item) {
      this.$store.commit("addItemToCart", item);
    },
    onRemoveItem(created) {
      this.$store.commit("removeItemFromCart", created);
    },
    async onSearchChange() {
      if (this.search === this.lastSearch) return;

      this.loadingProcess = 0;
      this.isLoaded = false;

      if (this.search) {
        const searchResponse = await Axios.get(
          `/starships?search=${this.search}`
        );
        this.list = searchResponse.data.results.map(this.decorateShipInstance);
        this.loadingProcess = 100;
        this.isLoaded = true;
        this.lastSearch = this.search;
      } else {
        this.list = [];
        this.fetchShips();
      }
    },
    decorateShipInstance(ship) {
      ship.isOpened = false;
      return ship;
    },
    filteredByProp(prop) {
      return this.list.filter(item => item[prop] !== "unknown");
    }
  },
  computed: {
    shipList() {
      return this.$store.state.shipList;
    },
    throttledKeyUp() {
      const DELAY = 500;
      return debounce(this.onSearchChange, DELAY);
    }
  },
  watch: {
    $route() {
      const { query } = this.$route;

      //if query is not empty
      if (Object.entries(query).length && query.constructor === Object) {
        const filter = query["filterBy"];
        if (filter) {
          this.list = this.filteredByProp(filter);
        }
      }else{
        this.list = this.shipList
      }
    }
  },
  components: {
    List,
    Filters
  }
};
</script>

<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  height: 90vh;
  &__img {
    width: 100px;
  }
}
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;
  .search {
    width: 300px;
  }
}
</style>
