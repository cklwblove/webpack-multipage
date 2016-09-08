# 基于webpack构建多页面应用开发

## 简介

为了使开发快速高效，使用了以下技术：
### 前端技术
* js库：[jQuery](http://jquery.com/)
* UI框架：[Bootstrap](http://getbootstrap.com/)
* 模板语义库：[Handlebarsjs](http://handlebarsjs.com/)
* CSS 预处理语言：[LESS](http://www.lesscss.net)

常用jQuery插件(如分页插件[Mricode.Pagination](http://mricle.com/JqueryPagination),通知插件[toastr](http://codeseven.github.io/toastr/)等)，适用于PC端多页面应用开发。

## 怎么使用

首先，全局安装 [Webpack](https://www.npmjs.com/package/webpack).

*注：建议安装下淘宝的镜像，因为国内对于**npm**访问速度太慢，具体操作参照[淘宝镜像](https://npm.taobao.org)，下面有**cnpm**命令的安装说明，接下来就可以使用cnpm*

```bash
$ npm i -g webpack
```

然后, 克隆代码仓库，安装模块依赖。

```bash
$ git clone git@github.com:cklwblove/webapck-multipage.git
$ cd webpack-multipage
$ npm install
```

构建过程也非常简单，只需执行以下命令即可（根据不同环境配置，比如说有开发，测试，仿真，线上4个环境）

```bash
$ npm run dev # 开发模式
$ npm run test # 测试模式
$ npm run uat # 仿真模式
$ npm run build # 上线模式
```

## 开发

源码结构

<pre>
.
├─build                     # => 项目构建
│  └─webpack
├─dev                       # => 开发目录
├─dist                      # => 上线目录
└─src
    ├─api                   # => 模拟请求部分数据
    ├─assets                # => 静态资源
    │  ├─fonts
    │  ├─images
    │  ├─js                 # => 第三方js文件放到这里
    │  └─less
    └─modules               # => 模块化
        ├─fansManagement    # => 具体功能模块
        ├─fundsManagement   # => 具体功能模块
        ├─helpers           # => handlebars常用 helpers
        ├─lang              # => 国际化（中文说明或提示）
        ├─pagination        # => 分页组件
        └─utils             # => 工具类（xhr，func）
</pre>
