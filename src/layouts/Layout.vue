<script setup lang="ts">
const _isDark = isDark
</script>

<template>
  <view :class="_isDark ? 'dark' : ''">
    <slot />
  </view>
</template>

