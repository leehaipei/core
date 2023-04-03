# react单页应用使用了Router 路由，部署在Apache服务器，刷新报错 404 解决



## 一、问题描述

react单页应用使用了BrowserRouter 路由（HTML5 history API ），项目打包后，使用apache服务器访问https://wt.leehaipei.com/Calendar，能够正常显示，但是刷新后页面404了。



## 二、问题原因

刷新页面时访问的资源在服务端找不到，因为react-router设置的路径不是真实存在的路径。
如上的404现象，是因为在apache配置的根目录下面压根没有userinfo这个真实资源存在，这些访问资源都是在js里渲染的。



## 三、解决方案

1：进入apache目录的conf目录

2：打开httpd.conf

3：找到#LoadModule rewrite_module modules/mod_rewrite.so然后把前面的#去掉

4：找到所有的AllowOverride配置项，把所有的None都修改为All

5：在网站根目录下面新建一个 .htaccess 文件（不需要文件名，直接.htaccess 就可以，Windows可以），输入以下内容

```jsx
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```



## *注意

***目前，针对正在使用的服务，仅需要进行步骤5即可。需要重启网站，不必重启阿帕奇。**