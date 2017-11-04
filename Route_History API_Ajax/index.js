// 创建window中的Router对象, 且初始化
var indexRouter = new Router();
indexRouter.init();
// 添加路由
indexRouter.addRoute('/', function(){
    var sidebar = document.querySelector("sidebar");
    sidebar.innerHTML = "前端的全部基础课程包括: html, css, javascript";
});
indexRouter.addRoute('/html', function(){
    var sidebar = document.querySelector("sidebar");
    sidebar.innerHTML = "这是html课程";
});
indexRouter.addRoute('/css', function(){
    var sidebar = document.querySelector("sidebar");
    sidebar.innerHTML = "这是css课程";
});
indexRouter.addRoute('/js', function(){
    var sidebar = document.querySelector("sidebar");
    sidebar.innerHTML = "这是javascript课程";
});

