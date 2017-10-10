// 定义了一个全局对象client, 立即执行匿名函数让client对象有engine, browser, system 三个对象
/*
var client = {
    engine: engine,
    browser: browser,
    system: system
}
*/
var client = function(){
    // 呈现引擎
    var engine = {
        presto_opera: 0,
        webkit: 0,
        khtml: 0,
        gecko: 0,
        trident_ie: 0,
        engineVersion: null // 完整版本号
    }

    // 浏览器
    var browser = {
        opera: 0,
        safari: 0,
        Konqueror: 0,
        firefox: 0,
        ie: 0,
        browserVersion: null // 完整版本号
    }

    // 平台, 移动设备, 游戏系统
    var system = {
        win: false,
        mac: false,
        linux: false,

        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        //游戏系统
        wii: false, //任天堂, 定制版Opera; Opera/9.10 (Nintendo Wii; u; ; 1621; en)
        ps: false // Playstation 浏览器; Mozilla/5.0（playstation 3; 2.00）
    }

    var userAgent = navigator.userAgent;

    // 检测呈现引擎和浏览器
    if ()


}();