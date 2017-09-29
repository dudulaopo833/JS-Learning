## window.location Object 表示窗口中当前显示的文档的 Web 地址(url)的相关信息
* 属于window对象的一部分(window.location).
* 如果直接赋值给window.location会在当前打开窗口打开新的显示文档(其实是赋值给location.href属性). 而window.open()是打开新的窗口
* 方法有： reload(), replace()-不会在history上生成记录, assign()
* 属性中href表示整个url，而其他属性表示url中的各个部分
> href = "http://example.com:1234/test/test.htm#part2"   
> host = "example.com:1234"   
> hostname = "example.com"   
> hash = "#part2"   
> pathname = "/test/test.htm"   
> port = "1234"   
> protocal = "http:"   
> search = "?f=hdom_loc_search"   
