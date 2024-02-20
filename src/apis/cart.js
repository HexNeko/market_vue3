import httpInstance from "@/utils/http"
//插入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return httpInstance({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}
//删除购物车商品
export const delCartAPI = (ids) => {
    return httpInstance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}
//获取最新购物车列表
export const findNewCartListAPI = () => {
    return httpInstance({
        url: "/member/cart"
    })
}
//合并购物车
export const mergeCartAPI = (data) => {
    return httpInstance({
        url: '/member/cart/merge',
        method: 'POST',
        data
    })
}