const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath:'/',
    outputDir: process.env.NODE_ENV === "development" ? 'dist' : 'prodist', // 不同的环境打不同包名
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    devServer: {
        proxy: {
            '/api':{
                //   target:'http://10.8.5.115:8082',
                // target:process.env.VUE_APP_FLAG,
                target:'http://10.8.3.243:8082',
                // target:'http://10.8.5.184:8082',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':'',
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.json', '.vue'],
        },
        performance: {
            hints: false
        },
    },
};