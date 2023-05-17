import path from 'node:path'
import AutoImport from 'unplugin-auto-import/webpack'
import Components from 'unplugin-vue-components/webpack'
import UnoCSS from '@unocss/webpack'
import TaroResolver from './module/TaroResolver'

const r = p => path.resolve(__dirname, '..', p)

const isDev = process.env.NODE_ENV === 'development'

function webpackChain(chain) {
  // 添加自动引入
  // https://github.com/antfu/unplugin-auto-import
  chain.plugin('unplugin-auto-import').use(AutoImport({
    imports: [
      'vue',
      // 注意: 针对可能出现的 `$` 和 `$$`，手动排除
      // https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
      {
        'vue/macros': ['$ref', '$shallowRef', '$toRef', '$customRef', '$computed'],
      },
      TaroResolver(),
    ],
    dts: 'src/auto-imports.d.ts',
    dirs: [
      'src/composables',
      'src/store',
    ],
    vueTemplate: true,
    eslintrc: {
      enabled: true,
      filepath: 'src/.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  }))

  // 添加组件按需引入, 自动引入 `src/components` 目录下的组件
  // https://github.com/antfu/unplugin-vue-components
  chain.plugin('unplugin-vue-components').use(Components({
    dts: 'src/components.d.ts',
    dirs: ['src/components', 'src/layouts'],
    resolvers: [],
    types: [{
      from: '@tarojs/components',
      names: [
        'Ad', 'AdCustom', 'AnimationVideo', 'AnimationView', 'ArCamera', 'Audio', 'AwemeData', 'Block', 'Button', 'Camera', 'Canvas', 'ChannelLive', 'ChannelVideo', 'Checkbox', 'CheckboxGroup', 'CommentDetail', 'CommentList', 'ContactButton', 'CoverImage', 'CoverView', 'CustomWrapper', 'Editor', 'FollowSwan', 'Form', 'FunctionalPageNavigator', 'GridView', 'Icon', 'Image', 'InlinePaymentPanel', 'Input', 'KeyboardAccessory', 'Label', 'Lifestyle', 'Like', 'ListView', 'LivePlayer', 'LivePusher', 'Login', 'Lottie', 'Map', 'MatchMedia', 'MovableArea', 'MovableView', 'NativeSlot', 'NavigationBar', 'Navigator', 'OfficialAccount', 'OpenData', 'PageContainer', 'PageMeta', 'Picker', 'PickerGroup', 'PickerView', 'PickerViewColumn', 'Progress', 'PullToRefresh', 'Radio', 'RadioGroup', 'RichText', 'RootPortal', 'RtcRoom', 'RtcRoomItem', 'ScrollView', 'ShareElement', 'Slider', 'Slot', 'StickyHeader', 'StickySection', 'Swiper', 'SwiperItem', 'Switch', 'TabItem', 'Tabbar', 'Tabs', 'Text', 'Textarea', 'Video', 'VideoControl', 'VideoDanmu', 'View', 'VoipRoom', 'WebView',
      ],
    }],
  }))

  // 添加 unocss 支持
  // https://github.com/unocss/unocss
  chain.plugin('unocss').use(UnoCSS())

  // 支持 mjs 模块
  chain.merge({
    module: {
      rule: {
        mjs: {
          test: /\.mjs$/,
          include: [/node_modules/],
          type: 'javascript/auto',
        },
      },
    },
  })
}
/** @type {import('@tarojs/taro/types/compile').IProjectConfig} */
const config = {
  projectName: 'Taro & UnoCSS',
  date: '2022-6-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    '@tarojs/plugin-html',
    '@tarojs/plugin-http',
    ['@tarojs/plugin-framework-vue3', {
      vueLoaderOption: {
        // 添加 vue-macros 支持
        reactivityTransform: true, // 开启vue3响应性语法糖
      },
    }],
    // r('config/module/TimePlugin'),
  ],
  // jsMinimizer: 'terser',
  defineConstants: {
  },
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    '~': r('src'),
    '@': r('src'),
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: {
      timings: true,
    },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  logger: {
    stats: true,
  },
  mini: {
    webpackChain,
    hot: true,
    // minifyXML: {
    //   collapseWhitespace: true,
    // },
    // prerender: {
    //   match: 'pages/*/**', // 所有以 `pages/shop/` 开头的页面都参与 prerender
    //   console: true, // 在 prerender 过程中 console 打印语句是否执行
    // },
    postcss: {
      // 可以进行 autoprefixer 的配置。配置项参考官方文档 https://github.com/postcss/autoprefixer
      // autoprefixer: {
      //   enable: true,
      //   config: {
      //     // autoprefixer 配置项
      //   },
      // },
      pxtransform: {
        enable: true,
        config: {

        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
          maxSize: 10, // 设定转换尺寸上限（单位：kbytes）
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    webpackChain,
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (isDev)
    return merge({}, config, require('./dev'))

  return merge({}, config, require('./prod'))
}
