<!--
 * @Author: Mx
 * @Date: 2022-09-24 16:44:04
 * @Description: Dialog 对话框
-->
<template>
   <k-popup :closeOnClickOverlay="closeOnClickOverlay" :customStyle="{
    borderRadius: '20rpx',
    overflow: 'hidden',
    marginTop: `-${negativeTop}rpx`
  }" :duration="400" :safeAreaInsetBottom="false" :show="show" :zoom="zoom" @click="clickHandler" mode="center">
    <view class="k-modal">
      <view class="k-modal__title" v-if="title">
        <text class="iconfont" :class="titleIcon" v-if="titleIcon" :style="titleStyle"></text>
        <text>{{ title }}</text>
      </view>
      <!-- 内容区域 -->
      <view :style="{
        paddingTop: `${title ? 32 : 48}rpx`,
      }" class="k-modal__content">
        <slot>
          <text class="k-modal__content__text">{{ content }}</text>
        </slot>
      </view>
      <view class="k-modal__button-group--confirm-button" v-if="$slots.confirmButton">
        <slot name="confirmButton"></slot>
      </view>
      <!-- 底部按钮 -->
      <template v-else>
        <k-line></k-line>
        <view :style="{
          flexDirection: buttonReverse ? 'row-reverse' : 'row'
        }" class="k-modal__button-group">
          <!-- 只有取消按钮 -->
          <view :class="[showCancelButton && !showConfirmButton && 'k-modal__button-group__wrapper--only-cancel']"
            :hover-stay-time="150" @tap="cancelHandler"
            class="k-modal__button-group__wrapper k-modal__button-group__wrapper--cancel"
            hover-class="k-modal__button-group__wrapper--hover" v-if="showCancelButton">
            <text :style="{
              color: cancelColor
            }" class="k-modal__button-group__wrapper__text">{{ cancelText }}</text>
          </view>
          <k-line direction="column" v-if="showConfirmButton && showCancelButton"></k-line>
          <!-- 只有确定按钮 -->
          <view :class="[!showCancelButton && showConfirmButton && 'k-modal__button-group__wrapper--only-confirm']"
            :hover-stay-time="150" @tap="confirmHandler"
            class="k-modal__button-group__wrapper k-modal__button-group__wrapper--confirm"
            hover-class="k-modal__button-group__wrapper--hover" v-if="showConfirmButton">
            <text :style="{
              color: confirmColor
            }" class="k-modal__button-group__wrapper__text">{{ confirmText }}</text>
          </view>
          <!-- 取消确认都没有 -->
          <view :class="[!showCancelButton && !showConfirmButton && 'k-modal__button-group__wrapper--noBtns']"
            :hover-stay-time="150" @tap="cancelHandler" class="k-modal__button-group__wrapper"
            hover-class="k-modal__button-group__wrapper--hover" v-if="!showConfirmButton && !showCancelButton">
            我知道了
          </view>
        </view>
      </template>
    </view>
  </k-popup>
</template>

<script setup lang="ts">

import kPopup from "../k-popup/index.vue"   
import kLine from "../k-line/index.vue"

import { dialogProps } from "./props"

const props = defineProps(dialogProps)

const emit = defineEmits(['confirm', 'cancel', 'close'])

// 点击确定按钮
const confirmHandler = () => {
  emit('confirm')
}
// 点击取消按钮
const cancelHandler = () => {
  emit('cancel')
}
// 点击遮罩
const clickHandler = () => {
  if (props.closeOnClickOverlay) {
    emit('close')
  }
}

</script>
<style lang='scss' scoped>
 @import "./dialog.scss"   
</style>
