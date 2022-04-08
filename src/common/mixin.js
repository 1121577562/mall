//=>BackTop的混入封装
import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMixin = {
    components: {
        BackTop: BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        //=>监听回到顶部组件
        backClick() {
            //给组件绑定点击事件，那么不能监听原生的点击事件，如果需要监听，需要添加修饰符 .native, 才可以监听。
            this.$refs.scroll.scrollTo(0, 0, 500);
            // console.log("backClick", this.$refs);
        },
        listenShowBackTop(position) {
            // 1.判断 BackTop 是否显示
            this.isShowBackTop = position > 1000;
        }
    }
}