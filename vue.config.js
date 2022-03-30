module.exports = {
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            extensions: [],
            //=> 给某些文件夹配置别名
            alias: {
                // "@": "src" 默认配置中 @表示 src目录
                "assets": "@/assets",
                "common": "@/common",
                "components": "@/components",
                "network": "@/network",
                "views": "@/views"
            }
        }
    }
}