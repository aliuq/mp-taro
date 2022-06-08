<script setup lang="ts">
const counter = useCounterStore()
function go() {
  navigateTo({ url: '/pages/hello/index' })
}
let isReady = $ref(false)
useReady(() => {
  setTimeout(() => {
    isReady = true
  }, 1500)
})
</script>

<template>
  <Layout>
    <template v-if="!isReady">
      <view class="i-my-loading w-100px h-100px mx-auto mt-100px" />
    </template>
    <template v-else>
      <view class="grid grid-cols-3 gap-4 px-4">
        <button class="w-full bg-base" type="primary" size="mini" @tap="counter.increment">
          Increment
        </button>
        <button class="w-full bg-base" type="primary" size="mini" @tap="counter.decrement">
          Decrement
        </button>
        <button class="w-full bg-base" type="primary" size="mini" @tap="go">
          /hello
        </button>
      </view>
      <Footer layout="home" />
    </template>
  </Layout>
</template>

