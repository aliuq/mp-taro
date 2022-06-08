<script setup lang="ts">
const counter = useCounterStore()
</script>

<template>
  <Layout>
    <view class="grid grid-cols-3 gap-4 px-4">
      <button class="w-full bg-base" type="primary" size="mini" @tap="counter.increment">
        Increment
      </button>
      <button class="w-full bg-base" type="primary" size="mini" @tap="counter.decrement">
        Decrement
      </button>
      <button class="w-full bg-base" type="primary" size="mini" @tap="navigateBack">
        /home
      </button>
    </view>
    <Footer layout="hello" />
  </Layout>
</template>
