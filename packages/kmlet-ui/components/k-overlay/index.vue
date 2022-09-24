<!--
 * @Author       : Mx
 * @Date         : 2022-09-24
 * @Description  : OverLay 遮罩层 用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
-->
<template>
  <k-transition :custom-style="overlayStyle" :show="show" @click="clickHandler" custom-class="k-overlay">
    <slot />
  </k-transition>
</template>

<script setup lang="ts">
import kTransition from "../k-transition/index.vue"
import { overlayProps } from './props'

const props = defineProps(overlayProps)

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: props.zIndex,
  bottom: 0,
  'background-color': `rgba(0, 0, 0, ${props.opacity})`
}

const emit = defineEmits(['click'])
const clickHandler = () => {
  emit('click')
}
</script>
<style lang='scss' scoped></style>
