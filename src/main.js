import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false;

// 安装自己封装的插件
Vue.use(toast);

//设置事件总线
Vue.prototype.$bus = new Vue();

// 解决移动端 300ms延迟
Fastclick.attach(document.body);

// 使用懒加载的插件
Vue.use(VueLazyload, {
    //=>图片没有加载回来的占位图
    loading: require('./assets/img/common/placeholder.png')
});


new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')

// console.log(Vue.prototype);