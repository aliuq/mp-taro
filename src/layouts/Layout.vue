<script setup lang="ts">
</script>

<template>
  <view :class="isDark ? 'dark' : ''">
    <slot />
  </view>
</template>
