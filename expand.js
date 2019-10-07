/**
 * 格式化日期
 * @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd）]
 */
Date.prototype.format = function (fmt = 'yyyy-MM-dd') {
    var date = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(), 
        "h+": this.getHours(), 
        "m+": this.getMinutes(), 
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds() 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var key in date) {
        if (new RegExp("(" + key + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (date[key]) : (("00" + date[key]).substr(("" + date[key]).length)));
        }
    }
    return fmt;
}
/**
 * 返回带有时区的时间
 * @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd hh:mm:ss）]
 */
 Date.prototype.getUtcTime = function (format = 'yyyy-MM-dd hh:mm:ss') {
    return this.format(format) + 'GMT' + Math.abs(new Date().getTimezoneOffset() / 60) + '00'
}
/**
* 获取当前月的最后一天
* @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd）]
*/
Date.prototype.getCurrentMonthLast = function (format = 'yyyy-MM-dd') {
    var currentMonth = this.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(this.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    return new Date(nextMonthFirstDay - oneDay).format(format);
}
/**
* 获取当前月的第一天
* @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd）]
*/
Date.prototype.getCurrentMonthFirst = function (format = 'yyyy-MM-dd') {
    return new Date(this.getFullYear(), this.getMonth(), 1).format(format);
}
/**
 * 字符串转换成金钱格式
 * @param {String} symbol [货币符号 默认为空]
 */
String.prototype.toMoney = function (symbol = '') {
    var pre = decimal = s1 = s2 = ''
    s1 = (this.split('.')[0]).split('').reverse().join(''); 
    decimal = this.split('.')[1] || ''
    if(isNaN(Number(s1[s1.length -1]))) {
        pre = s1[s1.length-1];
        s1 = s1.substring(0,s1.length-1);
    } 
    for(var i = 0,n = s1.length; i < n; i++) {
        (i % 3 == 0 && i > 0 && s1) ?  s2 += ',' + s1[i] : s2 += s1[i]
    }
    return symbol + pre + s2.split('').reverse().join('') + (decimal ? '.' + decimal : '');
}
/**
 * [{},{}] 格式转换成{{},{}}
 */
Array.prototype.toObject = function () {
    var json = {}
    for(var i = 0, n = this.length; i < n; i++) {
        Object.assign(json,this[i])
    }
    return json;
}