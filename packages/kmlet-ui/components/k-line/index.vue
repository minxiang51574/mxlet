<!--
 * @Author: Mx
 * @Date: 2022-09-24 16:50:39
 * @Description: line 线条
-->
<template>
  <view class="k-line" :style="[lineStyle]">
	</view>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { lineProps } from "./props"

const props = defineProps(lineProps)
const { margin, direction, color, dashed, hairline,length} = props

const lineStyle = computed(()=>{
	const style = reactive({})
	if(direction === 'row'){
		style.borderBottomWidth = '2rpx'
		style.borderBottomStyle = dashed ? 'dashed' : 'solid'
		style.width = length
		if (hairline) style.transform = 'scaleY(0.5)'
	} else {
		// 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
		style.borderLeftWidth = '2rpx'
		style.borderLeftStyle = dashed ? 'dashed' : 'solid'
		// #ifdef MP-WEIXIN
		style.height = length
		// #endif
		if (hairline) style.transform = 'scaleX(0.5)'
	}
	style.borderColor = color
	return {
		...style,
	}

})
</script>
<style lang='scss' scoped>
	.k-line {
	/* #ifndef APP-NVUE */
	vertical-align: middle;
	/* #endif */
}
</style>
