<!--
 * @Author: Mx
 * @Date: 2022-09-20 16:31:58
 * @Description: 
-->
<template>
  <view class="content">
    <h3 style="color:red;text-align: center;" >1.按钮</h3>
    <view>
      <h3 style="color:red">1-1.size</h3>
      <k-button size="large" type="primary">large</k-button>
      <k-button type="primary">default</k-button>
      <k-button size="small" type="primary">small</k-button>

      <h3 style="color:red">1-2.disabled</h3>
      <k-button type="primary" disabled>主按钮 disabled</k-button>
      <k-button type="primary" plain disabled>次按钮 disabled</k-button>
      <k-button disabled>弱按钮 disabled</k-button>

      <h3 style="color:red">1-3.主按钮 次按钮 弱按钮</h3>
      <k-button type="primary">主按钮</k-button>
      <k-button type="primary" plain>次按钮 </k-button>
      <k-button>弱按钮</k-button>
      <h3 style="color:red">1-4.shape-square round</h3>
      <k-button type="primary" shape="round">round</k-button>
      <h3 style="color:red">1-5.block</h3>
      <k-button block type="primary">block</k-button>
      <h3 style="color:red">1-6.loading</h3>
      <k-button block type="primary" @click="confirm" :loading="loading">loading</k-button>
    </view>

    <h3 style="color:red">1-2.按钮组</h3>
    <k-button-group confirmText="确认核销" loadingText="核销中" cancelText="取消" @cancel="cancel" :loading="loading"
      @confirm="confirm">
    </k-button-group>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 1按钮
const loading = ref<Boolean>(false)
const disabled = ref<Boolean>(false)
  
const confirm = () => {
  loading.value = true
  // disabled.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const cancel = () => {
  console.log("cancel", loading);
}

</script>

<style>
.content {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
}



</style>
