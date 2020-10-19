// import type { Context } from '@nuxt/types'
import type {
  GetterTree,
  ActionTree,
  MutationTree,
  Commit,
  Dispatch,
} from 'vuex'
import axios from 'axios'
import type { RootState } from './index'

export const namespace = 'cart'

export interface ActionContext {
  commit: Commit
  dispatch: Dispatch
}

export interface Product {
  id: string
  name: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
}

interface PromotionResult {
  total: number
  discount: number
  payable: number
  error: string
}

export interface CartState {
  items: CartItem[]
  discount: number
}

export const state = () => ({
  items: [],
  discount: 0,
})

export const CartMutationTypes = {
  ADD_TO_CARD: 'addToCart',
  REMOVE_FROM_CARD: 'removeFromCart',
  INCREASE_QUANTITY: 'increaseQuantity',
  DECREASE_QUANTITY: 'decreaseQuantity',
  APPLY_PROMOTION: 'applyPromotion',
}

export const mutations: MutationTree<CartState> = {
  [CartMutationTypes.ADD_TO_CARD]: (state: CartState, item: Product) => {
    let exist = state.items.find((element: any) => element.id === item.id)
    if (exist == undefined) {
      state.items.push({ ...item, quantity: 1 })
    } else {
      exist.quantity++
    }
  },
  [CartMutationTypes.REMOVE_FROM_CARD]: (state: CartState, id: string) => {
    state.items = state.items.filter((element) => element.id != id)
  },
  [CartMutationTypes.INCREASE_QUANTITY]: (state, id: string) => {
    let exist = state.items.find((element: any) => element.id === id)
    if (exist !== undefined) {
      exist.quantity++
    }
  },
  [CartMutationTypes.DECREASE_QUANTITY]: (state: CartState, id: string) => {
    let exist = state.items.find((element: any) => element.id === id)
    if (exist !== undefined) {
      exist.quantity--
      if (exist.quantity < 1) {
        state.items = state.items.filter((element) => element.id != id)
      }
    }
  },
  [CartMutationTypes.APPLY_PROMOTION]: (
    state: CartState,
    promotion: PromotionResult
  ) => {
    state.discount = promotion.discount
  },
}

export const CartActionTypes = {
  ADD_TO_CART: 'addToCart',
  REMOVE_FROM_CART: 'removeFromCart',
  INCREASE_QUANTITY: 'increaseQuantity',
  DECREASE_QUANTITY: 'decreaseQuantity',
  APPLY_PROMOTION: 'applyPromotion',
}

export const actions: ActionTree<CartState, RootState> = {
  [CartActionTypes.ADD_TO_CART](context: ActionContext, item: Product) {
    context.commit(CartMutationTypes.ADD_TO_CARD, item)
  },
  [CartActionTypes.REMOVE_FROM_CART](context: ActionContext, id: string) {
    context.commit(CartMutationTypes.REMOVE_FROM_CARD, id)
  },
  [CartActionTypes.INCREASE_QUANTITY](context: ActionContext, id: string) {
    context.commit(CartMutationTypes.INCREASE_QUANTITY, id)
  },
  [CartActionTypes.DECREASE_QUANTITY](context: ActionContext, id: string) {
    context.commit(CartMutationTypes.DECREASE_QUANTITY, id)
  },
  async [CartActionTypes.APPLY_PROMOTION]({ commit, getters }, code: string) {
    const { data } = await axios.post('http://localhost:3001/api/checkout', {
      products: getters['cartItems'],
      promotionCode: code,
    })
    commit(CartMutationTypes.APPLY_PROMOTION, data)
  },
}

export const CartGetterTypes = {
  CART_ITEMS_COUNT: 'cartItemsCount',
  CART_ITEMS: 'cartItems',
  CART_DISCOUNT: 'cartDiscount',
}

export const getters: GetterTree<CartState, RootState> = {
  cartItemsCount: (state: CartState) => state.items.length,
  cartItems: (state: CartState) => state.items,
  cartDiscount: (state: CartState) => state.discount,
}
