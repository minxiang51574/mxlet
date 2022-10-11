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

                <k-radio-group name="radio" text-position="left" v-model="chooseVal" @change="change">
                    <k-list-cell v-for="(item, index) in radioItems">
                        <k-radio :label="item.value">{{item.name}}</k-radio>
                    </k-list-cell>

                </k-radio-group>
            </view>
        </k-popup>
    </view>
</template>
 
<script setup lang="ts">
import kToolbar from "../k-toolbar/index.vue"
import kPopup from "../k-popup/index.vue"
import kRadioGroup from "../k-radio-group/index.vue"
import kListCell from "../k-list-cell/index.vue"
import kRadio from "../k-radio/index.vue"

import { computed, ref, toRefs, watch } from 'vue';
import { actionsheetRadioProps } from "./props"
import { createComponent } from "@kmlet/shared"

const componentName = createComponent('actionsheetRadio')

const emit = defineEmits(['close', 'chooseItem', 'update:modelValue'])
const props = defineProps(actionsheetRadioProps)
const { title, radioItems, show } = toRefs(props)

const chooseVal = ref(null) // 选择数据

/*
 * @Description 更新选中 
 * */
const undateChecked = (val) => {
    chooseVal.value = val
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
    emit("update:modelValue", val)
    undateChecked(val)
    setTimeout(() => {
        emit("close")
    }, 200)
}

// 关闭
const close = () => {
    emit("close")
}

watch(
    () => show.value, () => {
        undateChecked(props.modelValue)
    },
);
</script>
<style lang='scss' scoped>
@import "./actionsheetRadio.scss"
</style>
