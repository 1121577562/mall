import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.config.productionTip = false

//设置事件总线
Vue.prototype.$bus = new Vue();

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

// console.log(Vue.prototype);