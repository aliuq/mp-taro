<script setup lang="ts">
const counter = useCounterStore()
function go() {
  navigateTo({ url: '/pages/hello/index' })
}
</script>

<template>
  <Layout>
    <Suspense>
      <view>
        <view class="grid grid-cols-3 gap-4 px-4">
          <Button class="w-full bg-base" type="primary" size="mini" @tap="counter.increment">
            Increment
          </Button>
          <Button class="w-full bg-base" type="primary" size="mini" @tap="counter.decrement">
            Decrement
          </Button>
          <Button class="w-full bg-base" type="primary" size="mini" @tap="go">
            /hello
          </Button>
        </view>
        <Footer layout="home" />
      </view>
      <template #fallback>
        <view class="i-my-loading w-200px h-200px mx-auto mt-20px" />
      </template>
    </Suspense>
  </Layout>
</template>
