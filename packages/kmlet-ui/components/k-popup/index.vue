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
  // ?????????????????????safeAreaInsets????????????????????????????????????????????????????????????????????????
  // ?????????css??????????????????nvue?????????css???iPhoneX?????????????????????
  //   const { safeAreaInsets } = uni.$u.sys()
  if (mode !== 'center') {
    style.flex = 1
  }
  // ?????????????????????????????????transparent??????????????????????????????
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

// ????????????
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
  // ???????????????????????????k-transition????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  if (mode === 'center') {
    overlayClick()
  }
  emit('click')
}

</script>
<style lang="scss" scoped>
@import "./popup.scss"
</style>
