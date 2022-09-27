<!--
 * @Author       : Mx
 * @Date         : 2022-08-22 11:10:27
 * @Description  : Calendar 日历头部
-->
<template>
    <view class="k-calendar-header">
        <view class="k-calendar-header__title" v-if="showTitle">
            <text> {{ title }}</text>
            <i class="iconfont icon-a-48pxguanbi k-calendar-header__close" @click="cancel"></i>
        </view>
        <view class="k-calendar-header__subtitle" v-if="showSubtitle">{{ subtitle }}</view>
        <view class="k-calendar-header__weekdays">
            <text class="k-calendar-header__weekdays__weekday">一</text>
            <text class="k-calendar-header__weekdays__weekday">二</text>
            <text class="k-calendar-header__weekdays__weekday">三</text>
            <text class="k-calendar-header__weekdays__weekday">四</text>
            <text class="k-calendar-header__weekdays__weekday">五</text>
            <text class="k-calendar-header__weekdays__weekday">六</text>
            <text class="k-calendar-header__weekdays__weekday">日</text>
        </view>
    </view>
</template>

<script>
export default {
    name: 'k-calendar-header',
    props: {
        // 标题
        title: {
            type: String,
            default: ''
        },
        // 副标题
        subtitle: {
            type: String,
            default: ''
        },
        // 左边取消按钮文字
        // cancelText: {
        //     type: String,
        //     default: '取消'
        // },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: true
        },
        // 是否显示副标题
        showSubtitle: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {

        }
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        }
    },
}
</script>

<style lang="scss" scoped>
.k-calendar-header {
    box-sizing: border-box;

    &__title {
        font-size: 36rpx;
        color: $neutral-color-text-main;
        font-weight: 500;
        height: 80rpx;
        line-height: 80rpx;
        display: flex;
        justify-content: center;
        text-align: center;

        .cancel {
            font-size: 32rpx;
            color: #91949F;
        }

        .submit {
            font-size: 32rpx;
            /*  #ifdef  MP-WEIXIN */
            color: $k-mp-primary-color ;
            /*  #endif  */

            /*  #ifdef  H5  */
            color: $k-h-primary-color ;
            /*  #endif  */
        }
    }

    &__close {
        font-size: 40rpx;
        color: $neutral-color-text-minor;
        position: absolute;
        right: 20rpx;
    }

    &__subtitle {
        font-size: 36rpx;
        color: #31353C;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        margin-bottom: 20rpx;
    }

    &__weekdays {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: space-between;

        &__weekday {
            flex: 1;
            font-size: 24rpx;
            line-height: 34rpx;
            text-align: center;
            color: #64676D;
        }
    }
}
</style>
