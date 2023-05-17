<script setup lang="ts">
const props = defineProps<{ layout?: string }>()
const counter = useCounterStore()
</script>

<template>
  <view class="text-center text-sm my-10px text-gray-500 dark-text-blue-500">
    Count is {{ counter.count }}
  </view>
  <view class="flex justify-center mb-4">
    <view class="inline-block" @click="toggleDark()">
      <view class="text-xl" :class="isDark ? 'i-carbon-moon' : 'i-carbon-sun'" />
    </view>
  </view>
  <view class="color-base text-center capitalize">
    [ {{ props.layout }} Page ]
  </view>
</template>
