<!--
 * @Author       : Mx
 * @Date         : 2022-08-18 21:20:42
 * @Description  : checkboxGroup 复选框组
-->
<template>
    <checkbox-group :class="classes">
        <slot></slot>
    </checkbox-group>
</template>

<script setup lang="ts">
import { createComponent } from '@kmlet/shared';
import { computed, provide, watch } from 'vue';
const emit = defineEmits(['change', 'update:modelValue'])
const componentName = createComponent('checkbox')

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    disabled: {
        type: Boolean,
        default: false
    },
    max: {
        type: Number,
        default: 0
    },
    // 文本所在的位置
    textPosition: {
        type: String,
        default: 'right'
    },
})

const classes = computed(() => {
    const prefixCls = componentName
    return {
        [prefixCls]: true,
    }
})

const updateValue = (value: any[]) => {
    emit('update:modelValue', value)
    emit('change', value);

}

// 传递给checkbox
provide('parent', {
    label: computed(() => props.modelValue),
    disabled: computed(() => props.disabled),
    max: computed(() => props.max),
    position: props.textPosition,
    updateValue
});

watch(() => props.modelValue, (value) => {
    emit('change', value)
})

</script>

