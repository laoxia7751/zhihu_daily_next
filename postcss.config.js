const pxtorem = require("postcss-pxtorem");
module.exports = {
  plugins: [
    pxtorem({
      rootValue: 32,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: [/^\.nop2r/, /^\.am/,'html'],
      //排除antd样式，由于我给html设置了min-width，所以把html也排除在外不做rem转换
      replace: true,
      mediaQuery: false,
      minPixelValue: 3
    })
  ]
}