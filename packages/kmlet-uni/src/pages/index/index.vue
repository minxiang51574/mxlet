<!--
 * @Author: Mx
 * @Date: 2022-09-20 16:31:58
 * @Description: 
-->
<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <km-button></km-button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { isString } from "@kmlet/shared"

const title = ref('Hello')
console.log(isString('1'))
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
