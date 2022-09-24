/*
 * @Author: Mx
 * @Date: 2022-09-24 14:25:03
 * @Description: 
 */
export const overlayProps = {
    // 是否显示遮罩
    show: {
        type: Boolean,
        default: false
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
        type: [Number],
        default: 300
    },
    // 使用的动画过渡函数
    timingFunction: {
        type: String,
        default: 'ease-out'
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
        type: [String, Number],
        default: 0.5
    },
    // 层级z-index
    zIndex: {
        type: [String, Number],
        default: 10070
    }
}