<script setup lang="ts">
const counter = useCounterStore()
</script>

<template>
  <Layout>
    <view class="grid grid-cols-3 gap-4 px-4">
      <Button class="w-full bg-base" type="primary" size="mini" @tap="counter.increment">
        Increment
      </Button>
      <Button class="w-full bg-base" type="primary" size="mini" @tap="counter.decrement">
        Decrement
      </Button>
      <Button class="w-full bg-base" type="primary" size="mini" @tap="navigateBack()">
        /home
      </Button>
    </view>
    <Footer layout="hello" />
  </Layout>
</template>
