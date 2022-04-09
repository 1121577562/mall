import Toast from './Toast.vue'

const obj = {};

obj.install = function(Vue) {
    // console.log("安装toast插件时，调用了install方法,并且会把 Vue传递过来", Vue);
    //=> 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast); //=> 返回 VueComponent 构造器 

    //=> 2.new的方式，根据组件构造器，可以创建出来一个组件（也就是把 VueComponent 函数，当做构造函数执行，创建它的实例对象, 返回的结果是组件对象）
    const toast = new toastConstructor();

    //=> 3.将组件对象，手动挂载到某一个元素上（也就是把组件对象，放在某个元素中）
    toast.$mount(document.createElement('div'));

    //=> 4.toast.$el 的值就是 div标签，然后把 div标签放到body 中
    document.body.appendChild(toast.$el);

    //=> 5.把 toast组件对象，放在 Vue的原型上，那么在其他组件对象中，就可以拿到toast对象了，因为其他组件对象的原型链上，找的到 Vue.prototype。
    Vue.prototype.$toast = toast;
}



export default obj;