<!--
 * @Author       : Mx
 * @Date         : 2022-08-11 10:28:58
 * @Description  : Button 按钮组
-->
<template>
  <view class="k-button-group" :class="{ 'fixed': fixed }">
      <k-button block class="btn-item" @click="cancel" plain type="primary" v-if="showCancelButton">{{ cancelText }}
      </k-button>
      <k-button block class="btn-item" :disabled="disabled" :loading="loading" :loadingText="loadingText || confirmText"
        @click="confirm" type="primary">{{ confirmText }}</k-button>
    </view>
</template>

<script setup lang="ts">
import kButton from "../k-button/index.vue"
import { iconProps } from './props';

defineProps(iconProps)

const emit = defineEmits(['cancel', 'confirm', 'skip'])
  const cancel = () => {
    emit('cancel')
  }
  const confirm = () => {
    emit('confirm')
  }
</script>

<style lang='scss' scoped>
  @import './buttonGroup.scss';

  </style>