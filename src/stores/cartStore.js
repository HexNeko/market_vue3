import { defineStore } from "pinia"
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart = (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            //已加购物车
            item.count++
        } else {
            //未加购物车
            cartList.value.push(goods)
        }
        console.log('cartlist', cartList)
    }
    const delCart = (skuId) => {
        const index = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(index, 1)
    }
    const allCount = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count, 0)
    }) 
    const allPrice = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    })
    return {
        cartList,
        allCount,
        allPrice,
        addCart,
        delCart
    }
}, {
    persist: true
})