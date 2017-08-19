* 关于domReady浏览器渲染的过程
> 1. 浏览器渲染引擎的渲染过陈: 解析html构建dom树(构建dom节点) -> 构建渲染树(解析样式信息) -> 布局渲染树(布局dom节点)-> 绘制渲染树(绘制dom节点)  
> 2. 简单来说就是：dom tree -> render tree -> layout render tree -> paint render tree   
> 3. 具体渲染过程可以参考[这里](http://kb.cnblogs.com/page/129756/)
* DOMReady实现策略：
> 0. window.onload 这个事件是等 dom树构建好，所有外部资源(图片/请求)完成之后才触发；如果外部资源很多，那么就很慢！
> 0. document.onreadystatechange 这个事件和window.onload 相当，也要等所有资源加载好了才处理, 这个主要针对iframe!
> 1. 对于支持DOMContentLoaded事件的现代浏览器，就使用DOMContentLoaded事件
> 2. 对于不支持DOMContentLoaded事件的低版本IE浏览器，就是用document.documentElement.doSroll('left')来判断DOM树是否创建完毕! 
> 3. JQuery domReady实现方式：
```
function bindReady(){
    if ( readyBound ) return;
    readyBound = true;
    // Mozilla, Opera and webkit nightlies currently support this event
    if ( document.addEventListener ) {
        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", function(){
            document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
             jQuery.ready();
        }, false );
    // If IE event model is used
    } else if ( document.attachEvent ) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                document.detachEvent( "onreadystatechange", arguments.callee );
                jQuery.ready();
            }
        });
        // If IE and not an iframe
        // continually check to see if the document is ready
        if ( document.documentElement.doScroll && typeof window.frameElement === "undefined" ) (function(){
            if ( jQuery.isReady ) return;
           	try {
                // If IE is used, use the trick by Diego Perini
                 // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch( error ) {
                setTimeout( arguments.callee, 0 );
               return;
            }
            // and execute any waiting functions
            jQuery.ready();
        })();
    }
    // A fallback to window.onload, that will always work
    jQuery.event.add( window, "load", jQuery.ready );
}
```
> 4. 各大前段框架的DOMReady实现可以参考[这里](http://www.cnblogs.com/JulyZhang/archive/2011/02/12/1952484.html)
> 5. 学到的东西
arguments.callee表示执行自己!