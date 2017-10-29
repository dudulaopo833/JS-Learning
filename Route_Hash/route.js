/**
 * 有三个主要功能
 * 1. 多个路由集中处理
 * 2. 匹配对应路由
 * 3. 利用回调处理相应逻辑
 */

 // 匿名立即执行函数封装Router到window对象上
(function(){
    var Router = function(){
        this.routes = {}; // 用来保存路由信息
        this.currentHash = '';// 用来获取当前url中的hash
    };
    Router.prototype.addRoute = function(hashKey, callback){
        this.routes[hashKey] = callback || function(){}; // 保存路由和回调函数
    };
    Router.prototype.refresh = function(){
        this.currentHash = location.hash.substring(1) || "/";
        this.routes[this.currentHash](); // 匹配路由且执行路由的callback函数
    };
    Router.prototype.init = function(){ // 初始化来绑定hashchange事件
        window.addEventListener('hashchange', this.refresh.bind(this));
    };

    window.Router = Router; // 把Router绑定到window上
})();