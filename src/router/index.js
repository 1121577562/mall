// npm install vue-router@3.0.2 --save
import Vue from 'vue';
import VueRouter from 'vue-router';


const Home = () =>
    import ("views/home/Home.vue");
const Cart = () =>
    import ("views/cart/Cart.vue");
const Category = () =>
    import ("views/category/Category.vue");
const Profile = () =>
    import ("views/profile/Profile.vue");

const Detail = () =>
    import ("views/detail/Detail.vue");



// 1.安装插件
Vue.use(VueRouter);

// 2.创建VueRouter实例，并且配置路由映射关系。
const routes = [{
        path: "/",
        redirect: "/home"
    }, {
        path: "/home",
        component: Home
    }, {
        path: "/cart",
        component: Cart
    },
    {
        path: "/category",
        component: Category
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/detail/:id",
        component: Detail
    }
];

const router = new VueRouter({
    routes: routes,
    mode: "history"
});

// 3.导出路由对象
export default router;