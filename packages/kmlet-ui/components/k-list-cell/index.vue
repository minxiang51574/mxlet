<!--
 * @Author       : Mx
 * @Date         : 2022-09-26 16:18:39
 * @Description  : List 列表，常用的布局组件
-->
<template>
    <view class="k-list__cell" :class="{ 'k-highlight': highlight, 'k-list__cell-background': !background }"
        :style="{ paddingRight: padding[1] || 0, paddingLeft: padding[3] || padding[1] || 0, background: background, marginTop: marginTop + 'rpx', marginBottom: marginBottom + 'rpx', borderRadius: radius, justifyContent: justifyContent}"
        @tap="handleClick">
        <view v-if="topBorder" :style="{ background: borderColor, left: topLeft + 'rpx', right: topRight + 'rpx' }"
            class="k-cell__border-top" :class="{ 'k-cell__border-color': !borderColor }"></view>
        <slot></slot>
        <view v-if="bottomBorder"
            :style="{ background: borderColor, left: bottomLeft + 'rpx', right: bottomRight + 'rpx' }"
            class="k-cell__border-bottom" :class="{ 'k-cell__border-color': !borderColor }"></view>
        <view class="k-cell__arrow" v-if="arrow" :style="{ 'border-color': arrowColor }">
        </view>
    </view>
</template>

<script setup lang="ts">
import { listCellProps } from "./props"
const props = defineProps(listCellProps)
const { index, background, borderColor } = props
const emit = defineEmits(["click"])
const handleClick = () => {
    emit('click', { index });
}
</script>
<style lang='scss' scoped>
@import "./listCell.scss"
</style>
