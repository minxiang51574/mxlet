<!--
 * @Author       : Mx
 * @Date         : 2022-09-28 16:16:26
 * @Description  : RadioGroup 单选框组
-->
<template>
    <radio-group :class="classes">
        <slot></slot>
    </radio-group>
</template>

<script setup lang="ts">
import { createComponent } from '@kmlet/shared';
import { computed, provide, readonly, watch } from 'vue';
const emit = defineEmits(['change', 'update:modelValue'])
const componentName = createComponent('radiogroup')

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: ''
    },
    // 使用横纵方向
    direction: {
        type: String,
        default: 'vertical' //horizontal
    },
    // 文本所在的位置
    textPosition: {
        type: String,
        default: 'right'
    }
})

const classes = computed(() => {
    const prefixCls = componentName
    return {
        [prefixCls]: true,
        [`${prefixCls}--${props.direction}`]: true,
    }
})

const updateValue = (value: string | boolean | number) => {
    emit('update:modelValue', value)
}

// 传递给radio
provide('parent', {
    label: readonly(computed(() => props.modelValue)),
    position: props.textPosition,
    updateValue
});

watch(() => props.modelValue, (value) => {
    emit('change', value)
})

</script>

<style lang="scss">

</style>