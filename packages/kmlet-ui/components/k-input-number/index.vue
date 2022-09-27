<!--
 * @Author       : Mx
 * @Date         : 2022-09-26 16:44:54
 * @Description  : InputNumber 数字输入框
-->
<template>
    <view class="k-input__number">
        <!-- 减 -->
        <view class="k-minus__sign_box" @tap="minus">
            <view class="k-number__minus" :class="[disabled || min >= inputValue ? 'k-number__disabled' : '']">
                <k-icon name="icon-a-48pxjian" class="k-minus__sign"></k-icon>
            </view>
        </view>
        <!-- 内容 -->
        <input type="number" v-model="inputValue" :disabled="disabled" @blur="blur" class="k-number__input"
            :class="{'disabled_color':disabled }" />

        <!-- 加 -->
        <view class="k-number__plus_box" @tap="plus">
            <view class="k-number__plus" :style="{ minWidth: signWidth + 'rpx', minHeight: signWidth + 'rpx' }"
                :class="[disabled || inputValue >= max ? 'k-number__disabled' : '']">
                <k-icon name="icon-a-48pxjia" class="k-plus__sign"></k-icon>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { inputNumberProps } from "./props"
import kIcon from "../k-icon/index.vue"
const props = defineProps(inputNumberProps)
const inputValue = ref(0)

const { modelValue, min, max, index, params, disabled, step, signWidth } = props
const emit = defineEmits(["change", "update:modelValue", "disabled", "blur", "plus"])

const getValue = (val) => {
    val = Number(val)
    if (val < min) {
        val = min
    } else if (val > max) {
        val = max
    }
    return val
}

inputValue.value = getValue(modelValue)

watch(() => modelValue, (val) => {
    inputValue.value = getValue(val)
})
watch(inputValue, (newVal, oldVal) => {
    if (+newVal !== +oldVal) {
        const val = getValue(+newVal)
        emit("change", {
            value: val,
            index: index,
            params: params
        });
        emit("update:modelValue", +val);
    }
})

// 减
const minus = () => {
    calcNum('reduce');
}
// 加
const plus = () => {
    calcNum('plus');
}

const getScale = (val, step) => {
    let scale = 1;
    let scaleVal = 1;
    //浮点型
    if (!Number.isInteger(step)) {
        scale = Math.pow(10, (step + '').split('.')[1].length);
    }
    if (!Number.isInteger(val)) {
        scaleVal = Math.pow(10, (val + '').split('.')[1].length);
    }
    return Math.max(scale, scaleVal);
}

// 获取长度
const getLen = (val, step) => {
    let len = 0;
    let lenVal = 0;
    //浮点型
    if (!Number.isInteger(step)) {
        len = (step + '').split('.')[1].length
    }
    if (!Number.isInteger(val)) {
        lenVal = (val + '').split('.')[1].length
    }
    return Math.max(len, lenVal);
}

const toFixed = (num, s) => {
    let times = Math.pow(10, s)
    let des = num * times + 0.5
    console.log("des", des);
    let des2 = parseInt(des, 10) / times
    return Number(des2 + '')
}

// 计算
const calcNum = (type) => {
    if (disabled || (inputValue.value == min && type === 'reduce') || (inputValue.value == max && type === 'plus')) return;
    const scale = getScale(Number(inputValue.value), Number(step));
    const len = getLen(Number(inputValue.value), Number(step));

    let num = Number(inputValue.value) * scale;
    let step2 = step * scale;
    if (type === 'reduce') {
        num -= step2;
    } else if (type === 'plus') {
        num += step2;
    }
    let value = toFixed(num / scale, len);
    if (value < min) {
        value = min;
    } else if (value > max) {
        value = max;
    }
    inputValue.value = Number(value);;
}

const blur = (e) => {
    emit('blur', e)
    let value = e.detail.value;
    if (value) {
        if (~value.indexOf('.') && Number.isInteger(step) && Number.isInteger(Number(value))) {
            value = value.split('.')[0];
        }
        value = getValue(value)
    } else {
        value = min;
    }
    inputValue.value = value;
}
</script>
<style lang='scss' scoped>
@import "./inputNumber.scss"
</style>
