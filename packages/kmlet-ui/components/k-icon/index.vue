<!--
 * @Author: Mx
 * @Date: 2022-09-23 09:47:32
 * @Description: Icon 图标
-->
<template>
      <i class="iconfont" :class="[componentName,name,fontClassName]" :style="{
         color,
         fontSize:pxSize(size)
      }" ></i>
</template>
<script setup lang="ts">
import { createComponent, pxSize } from '@kmlet/shared'
import { toRefs } from "vue";
import { props } from "./props"

const componentName = createComponent('icon')

const iconProps = defineProps(props)

const { name ,size ,color} = toRefs(iconProps)

</script>
<style lang='scss' scoped>
@import '../../assets/iconfont/iconfont.css' 
</style>
