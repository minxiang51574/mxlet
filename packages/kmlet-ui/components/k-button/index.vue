<!--
 * @Author       : Mx
 * @Date         : 2022-08-11 10:28:58
 * @Description  : Button 组件
-->
<template>
  <view :class="classes" @click="handleClick">
    <view class="k-button__warp">
      <view v-if="loading">
        <k-icon name="icon-a-24_loading3fanbai" fontClassName="iconfont-loading"></k-icon>
        <text :class="{ text: loading }"> {{ loadingText }}</text>
      </view>
      <view v-if="$slots.default && !loading">
        <slot></slot>
      </view>
    </view>
  </view>
</template> 

<script setup lang="ts"> 
import kIcon from "../k-icon/index.vue"
import { createComponent } from '@kmlet/shared'

import { computed, toRefs } from 'vue'
import { props } from './props'

const componentName = createComponent('button')

const buttonProps = defineProps(props)
const emit = defineEmits(['click'])

const { type, size, plain, disabled, loading, shape, block } = toRefs(buttonProps)

// 类名
const classes = computed(() => {
  const prefixCls = componentName

  return {
    [prefixCls]: true,
    [`${prefixCls}--${type.value}`]: type.value,
    [`${prefixCls}--${size.value}`]: size.value,
    [`${prefixCls}--${shape.value}`]: shape.value,
    [`${prefixCls}--plain`]: plain.value,
    [`${prefixCls}--block`]: block.value,
    [`${prefixCls}--disabled`]: disabled.value,
    [`${prefixCls}--loading`]: loading.value
  }
})

// 点击
const handleClick = (event: MouseEvent) => {
  if (!loading.value && !disabled.value) {
    emit('click', event)
  }
} 

</script>
<style lang='scss' scoped>
@import './button.scss';
</style>
