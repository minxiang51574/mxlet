<!--
 * @Author       : Mx
 * @Date         : 2022-08-24 10:24:44
 * @Description  : ActionSheet-radio 动作面板
-->
<template>
    <view :class="classes">
        <k-popup mode="bottom" round="20" :show="show" @close="close">
            <view class="k-actionsheetRadio__content">
                <k-toolbar :title="title" :showCancelBtn="false" :showConfirmBtn="false" showCloseIcon @close="close">
                </k-toolbar>
                <k-radio-group>
                    <k-label v-for="(item, index) in radioItems" :key="index">
                        <k-list-cell>
                            <view class="k-actionsheetRadio__cell">
                                <text class="k-actionsheetRadio__name" :class="{ active: chooseVal == index + 1 }">
                                    {{item.name}}
                                </text>
                                <k-radio :checked="item.checked" :value="item.value" isActionSheet @change="change">
                                </k-radio>
                            </view>
                        </k-list-cell>
                    </k-label>
                </k-radio-group>
            </view>
        </k-popup>
    </view>
</template>
 
<script setup lang="ts">
import kToolbar from "../k-toolbar/index.vue"
import kPopup from "../k-popup/index.vue"
import kRadioGroup from "../k-radio-group/index.vue"
import kLabel from "../k-label/index.vue"
import kListCell from "../k-list-cell/index.vue"
import kRadio from "../k-radio/index.vue"

import { computed, ref, toRefs, watch } from 'vue';
import { actionsheetRadioProps } from "./props"
import { createComponent } from "@kmlet/shared"

const componentName = createComponent('actionsheetRadio')

const emit = defineEmits(['close', 'chooseItem', 'update:modelValue'])
const props = defineProps(actionsheetRadioProps)
const { title, radioItems, show } = toRefs(props)

const chooseVal = ref(null)

/*
 * @Description 更新选中 
 * */
const undateChecked = (val) => {
    radioItems.value.forEach(item => {
        item.checked = item.value == val ? true : false
    })
}
// 样式
const classes = computed(() => {
    const prefixCls = componentName;
    return {
        [prefixCls]: true
    };
});

// 改变
const change = (val) => {
    chooseVal.value = val.value
    emit("update:modelValue", val.value)
    undateChecked(val.value)

    setTimeout(() => {
        emit("close")
    }, 200)
}

// 关闭
const close = () => {
    emit("close")
}

watch(
    () => props.show, () => {
        undateChecked(props.modelValue)
    },
);
</script>
<style lang='scss' scoped>
.k-actionsheetRadio {

    &__content {
        min-height: 800rpx;
        padding-bottom: calc(constant(safe-area-inset-bottom) + 180rpx);
        padding-bottom: calc(env(safe-area-inset-bottom) + 180rpx);
    }

    &__cell {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__name {
        font-size: 32rpx;
        color: #31353c;

        &.active {
            /*  #ifdef  MP-WEIXIN */
            color: $k-mp-primary-color;
            /*  #endif  */

            /*  #ifdef  H5 */
            color: $k-h-primary-color;
            /*  #endif  */
        }
    }
}
</style>
