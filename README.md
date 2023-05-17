# Taro-Unocss

一套使用 Taro + Vue3 + TypeScript 的初始化模板，在此基础上增加了一些配置好的库，方便快速进行开发。

+ taro: v3.6.6
+ webpack: v5.x

## 功能

自动引入 + Typescript 类型声明，可以非常方便的进行开发

+ [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import): 自动按需引入 Taro 所有API
+ [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components): 自动引入组件
+ [`unocss`](https://github.com/unocss/unocss): unocss 原子化 css 引擎
+ [`pinia`](https://github.com/vuejs/pinia): 状态管理
+ [`unocss - presetIcons`](https://github.com/unocss/unocss/tree/main/packages/preset-icons): 提供丰富的 SVG 图标，简单易用易扩展
+ [`vueuse/core`](https://github.com/vueuse/vueuse): 一组高效的 Composition API 集合

> **注意事项**
>
> + 由于小程序限制，VueUse 和元素有关的 API 都不能使用，但是，部分和 Vue 相关的 API 可以使用
> + 依赖升级可能会出现问题，出现问题请退回到现在的版本

## 文件结构

+ components: 公共组件
+ composables: 实用 API 集合
+ icons: 自定义图标
+ store: 状态管理

## 开发

```bash
npx degit aliuq/mp-taro .
pnpm install
pnpm dev:weapp
pnpm build:weapp
```

## 感谢

感谢 [@antfu](https://github.com/antfu) 开源的 UnoCSS 项目以及其他的开源项目，让我们可以更加方便的进行开发。
