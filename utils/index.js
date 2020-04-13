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

//防抖
export function debounce(func, wait) {
    let timeout = null
    return function() {
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}


//获取上一天的日期
export const getLastDay = (date) => {
    let day = date.substr(-2)
    let month = date.substr(4,2)
    let year = date.substr(0,4)
    if(parseInt(day) == 1){
        if(parseInt(month) == 1){
            month = 12
            year -= 1
        }else{
            month = month - 1
        }
        //闰年
        if(month == 2){
           bay = year % 4 != 0 ? 29 : 28
        }else{
            day = [1,3,5,7,8,10,12].includes(month) ? 31 : 30
        }
    }else{
        day -= 1
    }

    return `${year}${addZero(month)}${addZero(day)}`
}

//日期补零
export const addZero = num => {
    return num.toString().length > 1 ? num : '0' + num
}