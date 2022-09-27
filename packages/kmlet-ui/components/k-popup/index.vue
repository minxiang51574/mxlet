<template>
  <view class="k-popup">
    <k-overlay :duration="overlayDuration" :opacity="overlayOpacity" :show="showOverlay" @click="overlayClick"
      v-if="overlay">
    </k-overlay>
    <k-transition :customStyle="transitionStyle" :duration="duration" :mode="position" :show="showOverlay"
      @afterEnter="afterEnter" @click="clickHandler">
      <view :style="[contentStyle]" @tap.stop class="k-popup__content">
        <slot></slot>
        <view :class="['k-popup__content__close--' + closeIconPos]" @tap.stop="close" class="k-popup__content__close"
          hover-class="k-popup__content__close--hover" hover-stay-time="150" v-if="closeable">
        </view>
      </view>
    </k-transition>
  </view>
</template>

<script setup lang="ts">
import kTransition from "../k-transition/index.vue"
import kOverlay from "../k-overlay/index.vue"

import { popupProps } from "./props"
import { computed, reactive, ref, toRef } from 'vue';
const props = defineProps(popupProps)

const { duration, zIndex, mode, bgColor, round, customStyle, zoom, closeOnClickOverlay } = props

const showOverlay = toRef(props, "show")

const overlayDuration = ref(duration + 50)

const transitionStyle = computed(() => {
  if (mode === 'left') {
    return {
      zIndex: zIndex,
      position: 'fixed',
      display: 'flex',
      bottom: 0,
      top: 0,
      left: 0
    }
  } else if (mode === 'right') {
    return {
      zIndex: zIndex,
      position: 'fixed',
      display: 'flex',
      bottom: 0,
      top: 0,
      right: 0
    }
  } else if (mode === 'top') {
    return {
      zIndex: zIndex,
      position: 'fixed',
      display: 'flex',
      left: 0,
      right: 0,
      top: 0
    }
  } else if (mode === 'bottom') {
    return {
      zIndex: zIndex,
      position: 'fixed',
      display: 'flex',
      left: 0,
      right: 0,
      bottom: 0
    }
  } else if (mode === 'center') {
    return {
      alignItems: 'center',
      'justify-content': 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: zIndex,
      position: 'fixed',
      display: 'flex'
    }
  }
})

const contentStyle = computed(() => {
  const style = reactive({})
  // 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
  // 不使用css方案，是因为nvue不支持css的iPhoneX安全区查询属性
  //   const { safeAreaInsets } = uni.$u.sys()
  if (mode !== 'center') {
    style.flex = 1
  }
  // 背景色，一般用于设置为transparent，去除默认的白色背景
  if (bgColor) {
    style.backgroundColor = bgColor
  }
  if (round) {
    const value = round + 'rpx'
    if (mode === 'top') {
      style.borderBottomLeftRadius = value
      style.borderBottomRightRadius = value
    } else if (mode === 'bottom') {
      style.borderTopLeftRadius = value
      style.borderTopRightRadius = value
    } else if (mode === 'center') {
      style.borderRadius = value
    }
  }
  return {
    ...style,
    ...customStyle
  }
})

const position = computed(() => {
  if (mode === 'center') {
    return zoom ? 'fade-zoom' : 'fade'
  }
  if (mode === 'left') {
    return 'slide-left'
  }
  if (mode === 'right') {
    return 'slide-right'
  }
  if (mode === 'bottom') {
    return 'slide-up'
  }
  if (mode === 'top') {
    return 'slide-down'
  }
})

const emit = defineEmits(['close', 'open', 'click'])

// 点击遮罩
const overlayClick = () => {
  if (closeOnClickOverlay) {
    emit('close')
  }
}
const close = () => {
  emit('close')
}
const afterEnter = () => {
  emit('open')
}
const clickHandler = () => {
  // 由于中部弹出时，其k-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
  if (mode === 'center') {
    overlayClick()
  }
  emit('click')
}

</script>
<style lang="scss" scoped>
@import "./popup.scss"
</style>
