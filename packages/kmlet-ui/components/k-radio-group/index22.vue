<!--
 * @Author       : Mx
 * @Date         : 2022-09-28 16:16:26
 * @Description  : 
-->
<template>
    <radio-group :name="name">
        <slot></slot>
    </radio-group>
</template>

<script setup lang="ts">
import { watch } from 'vue';
const emit = defineEmits(['change'])
const props = defineProps(
    {
        name: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [Number, String],
            default: ''
        },
    }
)

watch(() => props.modelValue, (value) => {
    console.log(1111, value);
    emit('change', value)
}, { immediate: true })

</script>
<style lang='scss' scoped>

</style>
