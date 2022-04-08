import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types.js'
export default {
    // mutations唯一的目的就是修改 state中状态。
    // mutations中的每个方法尽可能完成的事情比较单一一点(把异步操作或者判断逻辑放到actions中去做)
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true;
        state.cartList.push(payload);
    }
}