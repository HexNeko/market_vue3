//将components中的所有组件都进行全局化注册
//通过插件的方式
import ImageView from './ImageView/index.vue'
import Sku from './Sku/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('ImageView', ImageView)
        app.component('Sku', Sku)
    }
}