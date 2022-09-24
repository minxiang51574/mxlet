/*
 * @Author: Mx
 * @Date: 2022-09-24 17:13:03
 * @Description: 
 */
export const dialogProps = {
    // 是否展示modal
    show: {
        type: Boolean,
        default: false
    },
    // 标题
    title: {
        type: [String],
        default: ''
    },
    // 弹窗内容
    content: {
        type: String,
        default: ''
    },
    // 确认文案
    confirmText: {
        type: String,
        default: '确定'
    },
    // 取消文案
    cancelText: {
        type: String,
        default: '取消'
    },
    // 是否显示确认按钮
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    // 是否显示取消按钮
    showCancelButton: {
        type: Boolean,
        default: true
    },
    // 确认按钮颜色
    confirmColor: {
        type: String,

        // #ifdef H5
        default: '#1C87FF',
        // #endif

        // #ifdef MP-WEIXIN
        default: '#FD6846'
        // #endif

    },
    // 取消文字颜色
    cancelColor: {
        type: String,
        default: '#91949F'
    },
    // 对调确认和取消的位置
    buttonReverse: {
        type: Boolean,
        default: false
    },
    // 是否开启缩放效果
    zoom: {
        type: Boolean,
        default: true
    },
    // 是否允许点击遮罩关闭modal
    closeOnClickOverlay: {
        type: Boolean,
        default: false
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
    negativeTop: {
        type: [String, Number],
        default: 0
    },
    // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
    confirmButtonShape: {
        type: String,
        default: ''
    },
    titleIcon: {// 标题icon
        type: String,
        default: ''
    },
    titleStyle: {
        type: Object,
        default: {}
    }
}