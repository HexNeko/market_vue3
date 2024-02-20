import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    //获取最新购物车列表
    const updateCartList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    //添加购物车
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            await insertCartAPI({ skuId, count })
            updateCartList()
        }
        else {
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
    }
    //删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            const res = await findNewCartListAPI()
            cartList.value = res.result
        } else {
            const index = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(index, 1)
        }
    }
    //清空购物车
    const clearCart = () => {
        cartList.value = []
    }
    //单选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    //全选功能
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    //总数
    const allCount = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count, 0)
    })
    //总价
    const allPrice = computed(() => {
        return cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    })
    //已选总数
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    //已选总价
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    //是否全选
    const isAll = computed(() => {
        return cartList.value.every((item) => item.selected)
    })
    return {
        cartList,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        isAll,
        clearCart,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        updateCartList
    }
}, {
    persist: true
})