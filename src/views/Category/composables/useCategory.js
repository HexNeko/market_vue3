//封装banner轮播图业务相关代码
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    const categoryData = ref({})
    //获取路由参数
    const route = useRoute()

    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }

    onMounted(() => {
        getCategory()
    })

    // 路由参数变化时可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}