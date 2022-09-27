<!--
 * @Author       : Mx
 * @Date         : 2022-08-20 19:05:22
 * @Description  : SearchBar 搜索栏
-->
<template>
    <view class="k-searchbar">
        <span class="k-searchbar__search-label" v-if="label">{{ label }}</span>
        <view v-if="$slots.leftout" class="k-searchbar__search-icon k-searchbar__left-search-icon">
            <slot name="leftout"></slot>
        </view>

        <view class="k-searchbar__search-input">
            <!-- 搜索icon -->
            <view v-if="$slots.leftin" class="k-searchbar__search-icon k-searchbar__iptleft-search-icon"
                @click="leftIconClick">
                <slot name="leftin"></slot>
            </view>
            <!-- 输入框 -->
            <view class="k-searchbar__input-inner">
                <input ref="inputsearch" class="k-searchbar__input-bar" :type="inputType" :maxlength="maxLength"
                    :placeholder="placeholder || 'placeholder'" :value="modelValue"
                    placeholder-style="color:#B8BABE;font-size:32rpx" :disabled="disabled" :readonly="readonly"
                    @click="clickInput" @input="valueChange" @focus="valueFocus" @blur="valueBlur"
                    :style="styleSearchbar" />
                <view @click="handleClear" class="k-searchbar__input-clear" v-if="isShowCloseIcon">
                    <i class="iconfont icon-a-32pxqingchu"></i>
                </view>
            </view>
            <!-- 最右侧搜索按钮 -->
            <view v-if="$slots.rightin" class="k-searchbar__search-icon k-searchbar__iptright-sarch-icon"
                @click="rightIconClick">
                <slot name="rightin"></slot>
            </view>
        </view>
        <view v-if="$slots.rightout" class="k-searchbar__search-icon k-searchbar__right-search-icon">
            <slot name="rightout"></slot>
        </view>
    </view>

</template>
  
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    inputType: {
        type: String,
        default: 'textarea'
    },
    label: {
        type: String,
        default: ''
    },
    maxLength: {
        type: [String, Number],
        default: '9999'
    },
    placeholder: {
        type: String,
        default: ''
    },
    clearable: {
        type: Boolean,
        default: true
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    inputAlign: {
        type: String,
        default: 'left'
    }
})
const { inputAlign } = props
const emit = defineEmits([
    'change',
    'update:modelValue',
    'blur',
    'focus',
    'clear',
    'search',
    'click-input',
    'click-left-icon',
    'click-right-icon'
])
const leftIconClick = (event: Event) => {
    emit('click-left-icon', props.modelValue, event);
};

const clickInput = (event: Event) => {
    emit('click-input', event);
};


const isShowCloseIcon = ref(false)

watch(() => props.modelValue, (val) => {
    if (val) {
        isShowCloseIcon.value = true
    }
})

const styleSearchbar: any = computed(() => {
    return {
        'text-align': inputAlign
    };
});
const rightIconClick = (event: Event) => {
    emit('click-right-icon', props.modelValue, event);
};

const valueChange = (event: any) => {
    let val = event.detail.value;
    if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength));
    }
    emit('update:modelValue', val, event);
    emit('change', val, event);
};
const state = reactive({
    active: false
});
const valueFocus = (event: any) => {
    let value = event.detail?.value;
    state.active = true;
    emit('focus', value, event);
};

const valueBlur = (event: any) => {
    setTimeout(() => {
        state.active = false;
    }, 0);

    let value = event.detail.value;
    if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength));
    }
    emit('blur', value, event);
};

const handleClear = (event: Event) => {
    isShowCloseIcon.value = false
    emit('update:modelValue', '', event);
    emit('change', '', event);
    emit('clear', '');
};
</script>
<style lang='scss' scoped>
.k-searchbar {
    display: flex;
    align-items: center;
    padding: 16rpx 0rpx;
    box-sizing: border-box;
    background: #fff;

    &__search-label {
        padding: 0 10rpx;
        color: #323233;
    }

    &__search-input {
        display: flex;
        align-items: center;
        height: 72rpx;
        flex: 1;
        padding: 0 24rpx;
        border-radius: 100rpx;
        background: $sub-color4-shallow;

        .k-searchbar__input-inner {
            display: flex;
            position: relative;
            width: 100%;

            >taro-form-core {
                width: 100%;
            }

            form {
                display: flex;
                align-items: center;
                width: 100%;
            }

            input {
                width: 100%;
                height: 100%;
                min-width: 200rpx;
            }

            .k-searchbar__input-clear {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                z-index: 2;
                top: 0;
                right: 0;
                width: 60rpx;
                height: 70rpx;
                margin-top: -10rpx;

                & .icon-a-32pxqingchu {
                    font-size: 32rpx;
                    color: #B8BABE;

                    &:hover {
                        cursor: pointer;
                        color: #B8BABE;
                    }
                }
            }
        }

        // 搜索icon
        .k-searchbar__iptleft-search-icon {
            margin-right: 12rpx;
            width: 28rpx;
            height: 28rpx;
            color: #91949F;
        }

        .k-searchbar__iptright-sarch-icon {
            margin-right: 28rpx;
        }

        .k-searchbar__input-bar {
            width: 100%;
            height: 72rpx;
            flex: 1;
            padding: 0;
            margin: 0;
            background-color: transparent;
            border-color: transparent;
            border-radius: 32rpx;
            outline: none;
            font-size: 32rpx;
            color: $neutral-color-text-main;
        }
    }

    &__left-search-icon {
        margin-right: 16rpx;
    }

    &__search-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__right-search-icon {
        margin-left: 16rpx;
        font-size: 28rpx;
    }
}
</style>
  