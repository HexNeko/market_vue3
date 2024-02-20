import { defineStore } from "pinia"
import { ref } from 'vue'
import { loginAPI } from "@/apis/user"
import { useCartStore } from "./cartStore"
import { mergeCartAPI } from "@/apis/cart"

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    //1.define state
    //2.define action
    //3.return state and action in typeof obj
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.updateCartList()
    }

    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true
})