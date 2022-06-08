import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  onChanged: (val) => {
    setStorageSync('theme', val ? 'dark' : 'light')
  },
})
export const toggleDark = useToggle(isDark)
