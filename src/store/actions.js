import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types.js'
export default {
    addCart(context, payload) {
        // payload新添加的商品
        // 1.查找之前数组中是否已经放过该商品
        let oldProduct = context.state.cartList.find(item => {
            return item.iid === payload.iid;
        })

        // 2.判断oldProduct
        if (oldProduct) {
            //说明之前已经存在该商品，因此只需要把它的count属性加1即可。
            // oldProduct.count += 1;
            context.commit(ADD_COUNTER, oldProduct);
        } else {
            payload.count = 1;
            // state.cartList.push(payload);
            context.commit(ADD_TO_CART, payload);
        }
    }
}