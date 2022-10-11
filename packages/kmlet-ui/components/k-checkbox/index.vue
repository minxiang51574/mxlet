<!--
 * @Author       : Mx
 * @Date         : 2022-09-28 14:58:22
 * @Description  : Checkbox 复选按钮
-->
<template>
    <view @tap.stop="checkboxChange" :class="classesWap">
        <view :class="classes" :style="styles">
            <view class="k-checkbox__mark"
                :style="{ borderBottomColor: checkMarkColor, borderRightColor: checkMarkColor }"></view>
        </view>
        <text class="k-checkbox__label">
            <slot></slot>
        </text>
    </view>
</template>

<script setup lang="ts">
import { createComponent } from "@kmlet/shared";
import { computed, inject, toRefs, watch } from "vue";
import { checkboxProps } from "./props"

const componentName = createComponent('checkbox');

const props = defineProps(checkboxProps)
const emit = defineEmits(['change', 'update:modelValue'])

const { disabled, label, activeColor, checkMarkColor, borderRadius, modelValue } = toRefs(props)

// 单独checkbox 
const checked = computed(() => !!modelValue.value);

// 是否能点击
const pDisabled = computed(() => {
    return hasParent.value ? (parent.disabled.value ? parent.disabled.value : disabled.value) : disabled.value;
});

// radioGroup 设置选中
let parent: any = inject('parent', null);
const position = computed(() => {
    return parent?.position;
});

let reverseState = position.value === 'left';

// 是否checkboxGroup
const hasParent = computed(() => !!parent);
const pValue = computed(() => {
    if (hasParent.value) {
        return parent.label.value.includes(label.value);
    } else {
        // 单独checkbox
        return modelValue.value;
    }
});

// 类名
const classes = computed(() => {
    const perfixCls = componentName
    return {
        [perfixCls]: true,
        [`${perfixCls}__disabled`]: pDisabled.value,
        [`${perfixCls}__color`]: !activeColor.value && pValue.value,
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

const emitChange = (value: string | boolean) => {
    emit('update:modelValue', value);
    emit('change', value);
};

// 按钮点击
const checkboxChange = () => {
    if (pDisabled.value) return;
    // 单独checkbox
    emitChange(!checked.value,);

    // checkboxGroup情况
    if (hasParent.value) {
        let value = parent.label.value;
        let max = parent.max.value;
        let { label } = props;
        const index = value.indexOf(label);
        if (index > -1) {
            value.splice(index, 1);
        } else if (index <= -1 && (value.length < max || !max)) {
            value.push(label);
        }
        parent.updateValue(value);// 更新

    }
}

watch(() => props.modelValue, (value) => {
    emit('change', value)
})

</script>
<style lang='scss' scoped>
@import "./checkbox.scss";
</style>
