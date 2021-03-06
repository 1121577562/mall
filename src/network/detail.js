import { request } from "./request";

export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid: iid
        }
    })
}

export function getRecommend() {
    return request({
        url: "/recommend"
    })
}


// 对 results 中的数据进行整合
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

//=>对商家信息进行整合
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}


//=>对参数信息进行整合
export class GoodsParam {
    constructor(info, rule) {
        // 注意：images可能没有值 (某些商品有值，某些没有值)
        this.image = info.image ? info.image[0] : "";
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}