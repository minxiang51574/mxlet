<!--
 * @Author       : Mx
 * @Date         : 2022-08-11 10:28:58
 * @Description  : Button 组件
-->
<template>
  <view :class="classes" @click="handleClick">
    <view class="k-button__warp">
      <view v-if="loadingBtn">
        <i class="iconfont iconfont-loading icon-a-24_loading3fanbai"></i>
        <text :class="{ text: loadingBtn }"> {{ loadingText }}</text>
      </view>
      <view v-if="$slots.default && !loadingBtn">
        <slot></slot>
      </view>
    </view>
  </view>
</template> 

<script setup lang="ts">

import { computed, watch, toRef } from 'vue'
import { props } from './props'

const buttonProps = defineProps(props)
const loadingBtn = toRef(buttonProps, "loading")

const emit = defineEmits(['click'])

watch(() => buttonProps.loading, (val) => {
  classes.value['k-button--loading'] = val
})
watch(() => buttonProps.disabled, (val) => {
  classes.value['k-button--disabled'] = val
})

const { type, size, plain, disabled, loading, shape, block } = buttonProps

// 类名
const classes = computed(() => {
  const prefixCls = 'k-button'
  return {
    [prefixCls]: true,
    [`${prefixCls}--${type}`]: type,
    [`${prefixCls}--${size}`]: size,
    [`${prefixCls}--${shape}`]: shape,
    [`${prefixCls}--plain`]: plain,
    [`${prefixCls}--block`]: block,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--loading`]: loading
  }
})

// 点击
const handleClick = (event: MouseEvent) => {
  if (!loading && !disabled) {
    emit('click', event)
  }
} 

</script>
<style lang='scss' scoped>
@import './button.scss';
</style>
