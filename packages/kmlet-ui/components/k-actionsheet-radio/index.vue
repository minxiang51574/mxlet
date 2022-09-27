<!--
 * @Author       : Mx
 * @Date         : 2022-08-24 10:24:44
 * @Description  : ActionSheet-radio 动作面板
-->
<template>
    <view :class="classes">
        <k-popup mode="bottom" round="20" :show="showPopup" @close="close">
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

import { computed, onMounted, ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    radioItems: {
        type: Array,
        default() {
            return []
        }
    },
    //标题
    title: {
        type: String,
        default: ""
    },
})
const { title, radioItems } = props
const chooseVal = ref(null)

watch(() => props.modelValue,
    (val) => {
        undateChecked(val)
    })

const undateChecked = (val) => {
    radioItems.forEach(item => {
        item.checked = item.value == val ? true : false
    })
}
const classes = computed(() => {
    const prefixCls = 'k-actionsheetRadio';
    return {
        [prefixCls]: true
    };
});

const showPopup = ref<Boolean>(false)
const emit = defineEmits(['close', 'chooseItem', 'update:modelValue'])
onMounted(() => {
    if (props.show) {
        showPopup.value = props.show;
    }
});
watch(
    () => props.show,
    (val) => {
        showPopup.value = val;
        undateChecked(props.modelValue)
    },
);
const change = (val: Object) => {
    chooseVal.value = val.value
    emit("update:modelValue", val.value)
    setTimeout(() => {
        emit("close")
    }, 200)
}
const close = () => {
    emit("close")
}
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
