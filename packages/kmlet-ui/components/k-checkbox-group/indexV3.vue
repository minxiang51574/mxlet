<!--
 * @Author       : Mx
 * @Date         : 2022-08-18 21:20:42
 * @Description  : checkboxGroup 复选框组
-->
<template>
    <checkbox-group :name="name" :class="classes">
        <slot></slot>
    </checkbox-group>
</template>

<script setup lang="ts">
import { createComponent } from '@kmlet/shared';
import { computed, provide, readonly, watch } from 'vue';
const emit = defineEmits(['change', 'update:modelValue'])
const componentName = createComponent('checkbox')

const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [Number, String],
        default: ''
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
    }
})

const updateValue = (value: string | boolean | number) => {
    emit('update:modelValue', value)
    emit('change', value);

}

// 传递给checkbox
provide('parent', {
    label: readonly(computed(() => props.modelValue)),
    position: props.textPosition,
    updateValue
});

watch(() => props.modelValue, (value) => {
    emit('change', value)
})

</script>

