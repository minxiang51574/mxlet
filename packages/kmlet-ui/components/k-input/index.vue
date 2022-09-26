<!--
 * @Author       : Mx
 * @Date         : 2022-09-26 10:11:21
 * @Description  : Input 输入框
-->
<template>
    <view class="k-input" :class="inputClass" :style="[wrapperStyle]">
        <view class="k-input__content">
            <view class="k-input__content__field-wrapper" @tap="clickHandler">
                <input class="k-input__content__field-wrapper__field" :style="[inputStyle]" :type="type"
                    :value="innerValue" :disabled="disabled || readonly" :maxlength="maxlength"
                    :placeholder="placeholder" :placeholder-style="placeholderStyle"
                    :placeholder-class="placeholderClass" :confirm-type="confirmType"
                    :password="password || type === 'password' || undefined" @input="onInput" @blur="onBlur"
                    @focus="onFocus" @confirm="onConfirm" @keyboardheightchange="onkeyboardheightchange" />
            </view>
            <view class="k-input__content__clear" v-if="isShowClear" @tap="onClear">
                <i class="iconfont icon-a-32pxqingchu"></i>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { inputProps } from "./props"

const props = defineProps(inputProps)

const { color, border, fontSize, disabled, shape, width, disabledColor, clearable, readonly, formatter, inputAlign, modelValue } = props;

// 组件类名
const inputClass = computed(() => {
    let classes = []
    border === "surround" &&
        (classes = classes.concat(["k-border", "k-input--radius"]));
    classes.push(`k-input--${shape}`);

    border === "bottom" && !disabled &&
        (classes = classes.concat([
            "k-border-bottom",
            "k-input--no-radius",
        ]));
    return classes.join(" ");
})
// 组件样式
const wrapperStyle = computed(() => {
    const style = {};
    if (width) {
        style.width = width + "rpx"
    }
    style.paddingTop = "6px";
    style.paddingBottom = "6px";
    style.paddingLeft = "9px";
    style.paddingRight = "9px";
    // 禁用状态下，被背景色加上对应的样式
    if (disabled) {
        style.backgroundColor = disabledColor;
        style.paddingLeft = "0px";
        style.paddingRight = "0px";
    }

    return {
        ...style
    };
})
// 输入框的样式
const inputStyle = computed(() => {
    const style = {
        color: color,
        fontSize: fontSize,
        textAlign: inputAlign,
    };
    if (disabled) {
        style.color = "#91949F"
    }
    return style;
})

let innerValue = ref<number | string>(null)  // 输入框的值
let changeFromInner = ref<Boolean>(false) // value绑定值的变化是由内部还是外部引起的
let firstChange = ref<Boolean>(true)     // value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
let focused = ref<Boolean>(false) // 是否处于获得焦点状态
const innerFormatter = (value) => value  // 过滤处理方法

watch(() => modelValue, (newVal, oldVal) => {
    innerValue.value = newVal;
    /* #ifdef H5 */
    // 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
    if (
        firstChange.value === false &&
        changeFromInner.value === false
    ) {
        valueChange();
    }
    /* #endif */
    firstChange.value = false;
    // 重置changeFromInner的值为false，标识下一次引起默认为外部引起的
    changeFromInner.value = false;
}, { immediate: true })

const emit = defineEmits(["update:modelValue", "change", "blur", "focus", "confirm", "keyboardheightchange", "clear"])

// 是否显示清除控件
const isShowClear = computed(() => {
    return !!clearable && !readonly && !!focused.value && innerValue.value !== "";
})

// 当键盘输入时，触发input事件
const onInput = (e) => {
    let { value = "" } = e.detail || {};
    // 格式化过滤方法
    const formatter2 = formatter || innerFormatter
    const formatValue = formatter2(value)
    // 为了避免props的单向数据流特性，需要先将innerValue值设置为当前值，再在$nextTick中重新赋予设置后的值才有效
    innerValue.value = value
    nextTick(() => {
        innerValue.value = formatValue;
        valueChange();
    })
}

// 内容发生变化，进行处理
const valueChange = () => {
    const value = innerValue.value;
    nextTick(() => {
        emit("update:modelValue", value);
        // 标识value值的变化是由内部引起的
        changeFromInner.value = true;
        emit("change", value);
    });
}
// 输入框失去焦点时触发
const onBlur = (event) => {
    emit("blur", event.detail.value);
}
// 输入框聚焦时触发
const onFocus = (event) => {
    focused.value = true;
    emit("focus");
}
// 点击清除控件
const onClear = () => {
    innerValue.value = "";
    nextTick(() => {
        valueChange();
        emit("clear");
    });
}
/**
* 在安卓nvue上，事件无法冒泡
* 在某些时间，我们希望监听u-from-item的点击事件，此时会导致点击u-form-item内的u-input后
* 无法触发u-form-item的点击事件，这里通过手动调用u-form-item的方法进行触发
*/
const clickHandler = () => {
    // #ifdef APP-NVUE
    // #endif
}

// 点击完成按钮时触发
const onConfirm = () => {
    emit("confirm", innerValue.value);
}

// 键盘高度发生变化的时候触发此事件
// 兼容性：微信小程序2.7.0+、App 3.1.0+
const onkeyboardheightchange = () => {
    emit("keyboardheightchange");
}
</script>
<style lang='scss' scoped>
@import "./input.scss"
</style>
