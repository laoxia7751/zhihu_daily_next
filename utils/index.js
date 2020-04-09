var moment = require('moment');

//进制转换
export const radixConvert = (num, fromRadix, toRadix) => parseInt(num, fromRadix).toString(toRadix);

//16进制颜色转换成rgba格式
export const colorRgb = (str,opacity=0.8) =>{
    var sColor = str.toLowerCase();
    if(sColor){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return "rgba(" + sColorChange.join(",")+","+opacity + ")";
    }else{
        return sColor;
    }
};

//知乎日报图片颜色转rgba
export const getRgbColor = (str, opacity = 0.8) => {
    let rgb = radixConvert(str, 16,16 )
    return colorRgb(rgb, opacity)
}

//格式化json数组中的时间戳
export const formatTime = (arr, name) => {
    return arr.map(item => {
        item[name] = moment(item[name]).format('MM-DD  hh:mm')
        return item
    })
}
