<template>
    <view class="k-toolbar" @touchmove.stop.prevent="preventEvent" v-if="show">
        <view class="k-toolbar__cancel__wrapper" hover-class="k-hover-class" v-if="showCancelBtn">
            <text class="k-toolbar__wrapper__cancel" @tap="cancel" :style="{
                color: cancelColor
            }">{{ cancelText }}</text>
        </view>
        <view class="k-toolbar__title k-line-1" v-if="title">{{ title }}
            <view class='closeIcon' v-if="showCloseIcon" @click="close">
                <i class="iconfont icon-a-48pxguanbi"></i>
            </view>
        </view>
        <view class="k-toolbar__confirm__wrapper" hover-class="k-hover-class" v-if="showConfirmBtn">
            <text class="k-toolbar__wrapper__confirm" @tap="confirm" :style="{
                color: confirmColor
            }">{{ confirmText }}</text>
        </view>

    </view>
</template>

<script>

export default {
    name: 'k-toolbar',
    props: {
        // 是否展示工具条
        show: {
            type: Boolean,
            default: true
        },
        // 取消按钮的文字
        cancelText: {
            type: String,
            default: '取消'
        },
        // 确认按钮的文字
        confirmText: {
            type: String,
            default: '确认'
        },
        // 取消按钮的颜色
        cancelColor: {
            type: String,
            default: '#91949F'
        },
        // 确认按钮的颜色
        confirmColor: {
            type: String,
            // #ifdef MP-WEIXIN
            default: '#FD6846',
            // #endif
            // #ifdef H5
            default: '#1C87FF'
            // #endif
        },
        // 标题文字
        title: {
            type: String,
            default: ''
        },
        showCancelBtn: {
            type: Boolean,
            default: true
        },
        showConfirmBtn: {
            type: Boolean,
            default: true
        },
        showCloseIcon: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 点击取消按钮
        cancel() {
            this.$emit('cancel')
        },
        // 点击确定按钮
        confirm() {
            this.$emit('confirm')
        },
        close() {
            this.$emit('close')
        },
        // 阻止事件冒泡
        preventEvent(e) {
            e && typeof (e.stopPropagation) === 'function' && e.stopPropagation()
        },
    },
}
</script>

<style lang="scss" scoped>
view,
scroll-view,
swiper-item {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    align-items: stretch;
    align-content: flex-start;
}

.k-toolbar {
    height: 122rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__wrapper {
        &__cancel {
            color: #909193;
            font-size: 16px;
            padding: 0 15px;
        }
    }

    &__title {
        color: #303133;
        // padding: 0 60rpx;
        font-size: 36rpx;
        color: $neutral-color-text-main;
        font-weight: 500;
        flex: 1;
        text-align: center;
        position: relative;

        .closeIcon {
            position: absolute;
            right: 30rpx;
            top: 0rpx;

            .iconfont {
                font-size: 40rpx;
                color: $neutral-color-text-minor;
            }
        }
    }

    &__wrapper {
        &__confirm {
            color: #3c9cff;
            font-size: 16px;
            padding: 0 15px;
        }
    }


}
</style>
