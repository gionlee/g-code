/*!
 * g-code.js v 0.0.1
 * 2019 gionlee
 * Released under the MIT License.
 */
function Code(obj) {
    this.codeLib = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 要随机显示的验证码
    this.direction = ['top', 'bottom'];  //  出现的位置
    this.xPoint = 10;  // 起始位置
    this.codeLength = 4;  // 验证码长度
    this.width = canvas.width; 
    this.height = canvas.height;
    this.fontSet = Math.floor((this.width - 20) / this.codeLength) + 'px serif';    // 字体 字号
    this.upset = true;   // 是否打乱顺序
    this.interfereth = [5,10]; // 干扰数量区间
    this.arcWidth = [1,5]; // 圆的半径区间
    this.realCode = '';   // 实际验证码    
    this.codeBg = '#fff';
    this.showInterferet = true;
    this.el = document.getElementById('canvas');
    this.ctx = this.el.getContext('2d');
    this.colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'] // 验证码颜色列表
    for (var key in obj) {
        this[key] = obj[key];
    }
}
//  生成实际的验证码
Code.prototype.cerateRealCode = function () {
    var that = this;
    that.realCode = '';
    that.xPoint = 10;
    if (!this.upset) {
        that.realCode = this.codeLib.substr(0,that.codeLength);
        return false;
    }
    for (var i = 0, n = that.codeLength; i < n; i++) {
        that.realCode += that.codeLib[Math.floor(Math.random() * that.codeLib.length)];
    }
}
// 开始进行绘画
Code.prototype.draw = function () {
    var that = this;
    that.cerateRealCode();
    that.ctx.fillStyle = that.codeBg;
    that.ctx.fillRect(0, 0, that.width, that.height);
    that.ctx.strokeStyle = "rgba(0,0,0,0)";
    that.ctx.beginPath();
    that.ctx.moveTo(0, that.height / 2);
    that.ctx.lineTo(that.width, that.height / 2);
    that.ctx.stroke();
    that.ctx.font = that.fontSet;
    for (var i = 0, n = that.realCode.length; i < n; i++) {
        var random = Math.floor(Math.random() * (that.height / 2) + that.height / 2)
        that.ctx.fillStyle = that.colorList[Math.floor(Math.random() * that.colorList.length)]
        that.ctx.textBseline = that.direction[Math.floor(Math.random() * 2)];
        that.ctx.fillText(that.realCode[i], that.xPoint,random );
        that.ctx.stroke();
        that.xPoint += (that.width - 20) / that.codeLength;
    }
    if(that.showInterferet) {
        that.interfereLine();
        that.interferePoint();
    }
    canvas.onclick = function () {
        that.drawAgain();
    }
}
/**生产随机区间数
 * @param {Array} arr [要生成随机数的区间默认0-10]
 */
Code.prototype.randomNumber = function (arr=[0,10]) {
    if(arr.length !== 2) {
        console.error('params length must be 2 ')
    }
    var list = []
    for(var i = arr[0],n = arr[1]; i < n; i++) {
        list.push(i)
    }
    return list[Math.floor(Math.random() * list.length)]
}
// 重新绘画
Code.prototype.drawAgain = function () {
    var that = this;
    that.ctx.clearRect(0, 0, that.width, that.height);
    that.draw();
}
// 转换成base64 形式图片url
Code.prototype.toImageSrc = function () {
    return canvas.toDataURL("image/png");
}
// 获取实际的验证码
Code.prototype.getRealCode = function () {
    return this.realCode;
}
// 干扰线
Code.prototype.interfereLine = function () {
    var that =  this;
    for (var i = 0, n = that.randomNumber(that.interfereth); i < n; i++) {
        var lineBegainX = that.randomNumber([0,that.width]);
        var lineBegainY = that.randomNumber([0,that.height]);
        var lineEndX = that.randomNumber([0,that.width]);
        var lineEndY = that.randomNumber([0,that.height]);
        that.ctx.strokeStyle = that.colorList[that.randomNumber([0,that.colorList.length])];
        that.ctx.beginPath();
        that.ctx.moveTo(lineBegainX, lineBegainY);
        that.ctx.lineTo(lineEndX, lineEndY);
        that.ctx.stroke();
    }
}
// 干扰点
Code.prototype.interferePoint = function () {
    var that = this;
    for (var i = 0, n = that.randomNumber(that.interfereth); i < n; i++) {
        var lineBegainX = that.randomNumber([0,that.width]);
        var lineBegainY = that.randomNumber([0,that.height]);
        that.ctx.fillStyle = that.colorList[that.randomNumber([0,that.colorList.length])];
        that.ctx.beginPath();
        that.ctx.arc(lineBegainX,lineBegainY,that.randomNumber(that.arcWidth),0,2*Math.PI);
        that.ctx.fill();
        that.ctx.closePath();
    }
}
var code = new Code({})
code.draw();