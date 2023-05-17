import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default defineConfig({
  shortcuts: [
    {
      'border-base': 'border-gray-200 dark:border-dark-200',
      'bg-base': 'bg-white dark:bg-dark-100',
      'color-base': 'text-gray-900 dark:text-gray-300',
      'color-fade': 'text-gray-900:50 dark:text-gray-300:50',
    },
  ],
  rules: [],
  presets: [
    presetUno({
      preflight: false,
    }),
    presetWeapp({
      isH5: process.env.TARO_ENV === 'h5',
      platform: 'taro',
      taroWebpack: 'webpack5',
      whRpx: false,
    }),
    presetAttributify(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        my: FileSystemIconLoader(
          './src/icons',
          svg => svg.replace(/#fff/, 'currentColor'),
        ),
      },
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributify(),
    transformerClass(),
  ],
})
