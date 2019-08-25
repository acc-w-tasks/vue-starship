const ITEMS_IN_CART = 'ITEMS_IN_CART'

export default {
  methods: {
    getCartStorage: () => {
      const currentItemsInCart = localStorage.getItem(ITEMS_IN_CART)
      if(currentItemsInCart){
        return JSON.parse(currentItemsInCart)
      }
    },
    clearCartStorage: () => localStorage.removeItem(ITEMS_IN_CART),
    addToCartStorage: (item) => {
      const currentItemsInCart = localStorage.getItem(ITEMS_IN_CART)
      if (currentItemsInCart) {
        const parsedItemsInCart = JSON.parse(currentItemsInCart)
        const existInCart = parsedItemsInCart.find(({ created }) => created === item.created)
        if (!existInCart) {
          const stringifiedUpdatedItemsInCart = JSON.stringify([...parsedItemsInCart, item])
          localStorage.setItem(ITEMS_IN_CART, stringifiedUpdatedItemsInCart)
        }
      } else {
        const stringifiedItemsInCart = JSON.stringify([item])
        localStorage.setItem(ITEMS_IN_CART, stringifiedItemsInCart)
      }
    },
    removeFromCartStorage: (createdProp) => {
      const currentItemsInCart = localStorage.getItem(ITEMS_IN_CART)
      if (currentItemsInCart) {
        let parsedItemsInCart = JSON.parse(currentItemsInCart)
        const findedIndex = parsedItemsInCart.findIndex(({ created }) => created === createdProp)
        if(findedIndex !== -1){
          parsedItemsInCart.splice(findedIndex,1)
          const stringifiedUpdatedItemsInCart = JSON.stringify(parsedItemsInCart)
          localStorage.setItem(ITEMS_IN_CART, stringifiedUpdatedItemsInCart)
        }
      }
    },
    getFromCartStorage: (createdProp) => {
      const currentItemsInCart = localStorage.getItem(ITEMS_IN_CART)
      if (currentItemsInCart) {
        const parsedItemsInCart = JSON.parse(currentItemsInCart)
        return parsedItemsInCart.find(({ created }) => created === createdProp)
      }
      return undefined
    }
  }
}