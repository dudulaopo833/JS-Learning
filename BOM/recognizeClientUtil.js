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
        chrome: 0,
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

    // 检测呈现引擎和浏览器; 顺序是按照伪装程度从高到低; 先检测Opera, 再来是WebKit, 第三是KHTML, 第四是Gecko, 最后是IE
    if (window.opera){ //检测opera浏览器和presto呈现引擎
        engine.engineVersion = browser.browserVersion = window.opera.version();
        engine.presto_opera = browser.opera = parseFloat(engine.engineVersion);
    } else if (/AppleWebKit\/(\S+)/.test(userAgent)) { // 检测WebKit 呈现引擎
        engine.engineVersion = RegExp.$1; // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个子匹配(以括号为标志)字符串
        engine.webkit = parseFloat(engine.engineVersion);

        if (/Chrome\/(\S+)/.test(userAgent)) { // 检测chrome浏览器
            browser.browserVersion = RegExp.$1;
            browser.chrome = parseFloat(browser.browserVersion);
        } else if (/Version\/(\S+)/.test(userAgent)) { // 检测safari浏览器
            browser.browserVersion = RegExp.$1;
            browser.safari = parseFloat(browser.browserVersion);
        } else {
            // 根据engine版本来近似地确定版本号,
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.browserVersion = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(userAgent) || /Konqueror\/([^;]+)/.test(userAgent)) { // [^;]不是逗号
        engine.engineVersion = browser.browserVersion = RegExp.$1;
        engine.khtml = browser.Konqueror = parseFloat(engine.engineVersion);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(userAgent)) { // 检测Gecko呈现引擎和检测firefox浏览器
        engine.engineVersion = RegExp.$1;
        engine.khtml = parseFloat(engine.engineVersion);

        // 确定是不是firfox浏览器 
        if (/Firefox\/()\S+)/.test(userAgent)) {
            browser.browserVersion = RegExp.$1;
            browser.firefox = parseFloat(browser.browserVersion);
        }
    } else if (/MSIE ([^;]+)/.test(userAgent)) {
        engine.engineVersion = browser.browserVersion = RegExp.$1;
        engine.trident_ie = browser.ie = parseFloat(engine.engineVersion);
    }


    // 用navigator的platform属性来检测平台
    var platform = navigator.platform;
    system.win = platform.indexOf("Win") == 0;
    system.mac = platform.indexOf("Mac" == 0);
    system.linux = platform == "x11" || platform.indexOf("Linux") == 0;

    if (system.win) { //检测具体windows系统
        if(/Win(?:dows }? ()[^do]{2})\s?(\d+\. \d+)?/.test(userAgent)) {
            if (RegExp.$1 == "NT") {
                switch(RegExp.$2) {
                    case "5.0": system.win = "2000"; break;
                    case "5.1": system.win = "XP"; break;
                    case "6.0": system.win = "Vista"; break;
                    case "6.1": system.win = "7"; break;
                    default: system.win = "NT"; break;
                }
            } else if (RegExp.$1 == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp.$1;
            }
        }
    }

    // 检测移动设备
    system.iphone = userAgent.indexOf("iPhone") > -1;
    system.ipod = userAgent.indexOf("iPod") > -1;
    system.ipad = userAgent.indexOf("iPad") > -1;
    system.nokiaN = userAgent.indexOf("NokiaN") > -1;

    if (system.win == "CE") { // Windows Phone
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d.\d+)/.test(userAgent)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp.$1)
        }
    }

    // 检测IOS版本
    if (system.mac && userAgent.indexOf("Mobile") > -1){
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(userAgent)){
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;
        }
    }

    // 检测安卓版本
    if (/Android (\d+\.\d+))/.test(userAgent)){
        system.android = parseFloat(RegExp.$1);
    }

    // 游戏系统
    system.wii = userAgent.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(userAgent);

    return {
        engine: engine,
        browser: browser,
        system: system
    }


}();