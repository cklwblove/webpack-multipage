---
引入webpack dll功能，解决打包速度缓慢
---

## 1.0.1

`2016-10-16`

- webpack 自动构建工具

  - 添加bootstrap定制功能，有关配置在build/config/bootstrap目录下

  - 引入dll功能，生成dll文件（src/assets/dll），命令为：npm run build:dll

- 项目src

  - handlebarjs文件后缀名由.handlebars修改为.hbs

  - 日历插件换为[bootstrap-datetimepicker](http://www.bootcss.com/p/bootstrap-datetimepicker/)
