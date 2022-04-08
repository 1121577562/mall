import Vue from 'vue';
import Vuex from 'vuex'

// 把mutations、actions 抽离到不同的文件中。
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

// 1.安装插件
Vue.use(Vuex);

// 2.创建Store对象
const state = {
    cartList: []
};
const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
})

// 3.导出store对象
export default store