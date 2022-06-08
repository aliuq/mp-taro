# Taro-Unocss

一套使用 Taro + Vue3 + TypeScript 的初始化模板，在此基础上增加了一些配置好的库，方便快速进行开发。

> 非常感谢 [@antfu](https://github.com/antfu) 开源的项目，从来没有想到开发可以这么方便

+ taro: v3.4.10
+ webpack: v4.x

> 3.5.x 支持 vite 和 webpack v5

## 功能

自动引入 + Typescript 类型声明，可以非常方便的进行开发

+ [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import): 自动按需引入Taro 所有API
+ [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components): 自动引入组件
+ [`unocss`](https://github.com/unocss/unocss): unocss 原子化 css 引擎
+ [`pinia`](https://github.com/vuejs/pinia): 状态管理
+ [`unocss - presetIcons`](https://github.com/unocss/unocss/tree/main/packages/preset-icons): 提供丰富的 SVG 图标，简单易用易扩展
+ [`vueuse/core`](https://github.com/vueuse/vueuse): 一组高效的 Composition API 集合

> 注意事项
>
> + 由于小程序限制，vueuse 和元素有关的 API 都不能使用，但是，部分和 Vue 相关的 API 可以使用
> + 由于小程序限制，unocss 在页面上不能使用 Attributify 和出现非字母横线的 class 名称
> + 依赖升级可能会出现问题，出现问题请退回到现在的版本

## 文件结构

+ components: 公共组件
+ composables: 实用 API 集合
+ icons: 自定义图标
+ store: 状态管理

## 开发

```bash
npm run install
npm run dev:weapp
npm run build:weapp
```
