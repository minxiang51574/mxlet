<!--
 * @Author       : Mx
 * @Date         : 2022-09-28 14:58:22
 * @Description  : Radio 单选按钮
-->
<template>
    <view @tap.stop="radioChange">
        <view :class="classes" :style="styles">
            <view class="k-check__mark" :style="{ borderBottomColor: checkMarkColor, borderRightColor: checkMarkColor }"
                v-if="isChecked"></view>

            <radio class="k-radio__hidden" :color="activeColor" :disabled="disabled" :value="value"
                :checked="isChecked"></radio>
        </view>
        <text class="k-radio__label">
            <slot></slot>
        </text>
    </view>
</template>

<script setup lang="ts">
import { createComponent } from "@kmlet/shared";
import { computed, ref, toRefs, watch } from "vue";
import { radioProps } from "./props"

const componentName = createComponent('radio');

const props = defineProps(radioProps)
const emit = defineEmits(['change'])

const { disabled, checked, value, activeColor, borderColor, checkMarkColor, borderRadius, } = toRefs(props)

// 是否选中
let isChecked = ref<Boolean>(false)

watch(() => checked.value, (newVal) => {
    isChecked.value = newVal
}, {
    immediate: true,
})
// 类名
const classes = computed(() => {
    const perfixCls = componentName
    return {
        [perfixCls]: true,
        [`${perfixCls}__disabled`]: disabled.value,
        [`${perfixCls}__color`]: !activeColor.value && isChecked.value,
    }
})
// 样式
const styles = computed(() => {
    return {
        backgroundColor: isChecked.value ? activeColor.value : '#fff',
        borderColor: isChecked.value ? activeColor.value : borderColor.value,
        borderRadius: borderRadius.value,
    }
})

// 按钮点击
const radioChange = () => {
    if (disabled.value || isChecked.value) return;
    isChecked.value = true;
    emit('change', {
        checked: isChecked.value,
        value: value.value
    })
}



</script>
<style lang='scss' scoped>
@import "./radio.scss";
</style>
