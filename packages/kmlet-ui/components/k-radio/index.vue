<!--
 * @Author       : Mx
 * @Date         : 2022-09-28 14:58:22
 * @Description  : Radio 单选按钮
-->
<template>
    <view @tap.stop="radioChange" class="k-radio_wrap" :class="classesWap">
        <view :class="classes" :style="styles">
            <view class="k-check__mark"
                :style="{ borderBottomColor: checkMarkColor, borderRightColor: checkMarkColor }"></view>
        </view>
        <text class="k-radio__label">
            <slot></slot>
        </text>
    </view>
</template>

<script setup lang="ts">
import { createComponent } from "@kmlet/shared";
import { computed, inject, toRefs } from "vue";
import { radioProps } from "./props"

const componentName = createComponent('radio');

const props = defineProps(radioProps)

const { disabled, label, activeColor, checkMarkColor, borderRadius, } = toRefs(props)


// radioGroup 设置选中
let parent: any = inject('parent', null);
const isCurValue = computed(() => {
    return parent?.label.value == label.value;
})
const position = computed(() => {
    return parent.position;
});
let reverseState = position.value === 'left';

// 类名
const classes = computed(() => {
    const perfixCls = componentName
    return {
        [perfixCls]: true,
        [`${perfixCls}__disabled`]: disabled.value,
        [`${perfixCls}__color`]: !activeColor.value && isCurValue.value,

    }
})
const classesWap = computed(() => {
    const perfixCls = componentName
    return {
        [`${perfixCls}--reverse`]: reverseState,
    }
})

// 样式
const styles = computed(() => {
    return {
        borderRadius: borderRadius.value,
    }
})


// 按钮点击
const radioChange = () => {
    if (isCurValue.value || disabled.value) return;
    parent.updateValue(label.value);// 更新
}


</script>
<style lang='scss' scoped>
@import "./radio.scss";
</style>
