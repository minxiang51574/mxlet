<!--
 * @Author       : Mx
 * @Date         : 2022-09-29 18:14:44
 * @Description  : 
-->
<!--
 * @Author       : Mx
 * @Date         : 2022-09-28 14:58:22
 * @Description  : Checkbox 复选按钮
-->
<template>
    <view @tap.stop="checkboxChange">
        <view :class="classes" :style="styles">
            <view class="k-check__mark"
                :style="{ borderBottomColor: checkMarkColor, borderRightColor: checkMarkColor }"></view>
        </view>
        <text class="k-check__label">
            <slot></slot>
        </text>
    </view>
</template>

<script setup lang="ts">
import { createComponent } from "@kmlet/shared";
import { computed, inject, toRefs } from "vue";
import { checkboxProps } from "./props"

const componentName = createComponent('checkbox');

const props = defineProps(checkboxProps)

const { disabled, label, activeColor, checkMarkColor, borderRadius, } = toRefs(props)


// radioGroup 设置选中
let parent: any = inject('parent', null);
const isCurValue = computed(() => {
    return parent?.label.value == label.value;
})

// 类名
const classes = computed(() => {
    const perfixCls = componentName
    return {
        [perfixCls]: true,
        [`${perfixCls}__disabled`]: disabled.value,
        [`${perfixCls}__color`]: !activeColor.value && isCurValue.value,
    }
})

// 样式
const styles = computed(() => {
    return {
        borderRadius: borderRadius.value,
    }
})

// 按钮点击
const checkboxChange = () => {
    if (disabled.value) return;
    parent.updateValue(label.value);// 更新
}


</script>
<style lang='scss' scoped>
@import "./checkbox.scss";
</style>
