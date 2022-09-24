/*
 * @Author: Mx
 * @Date: 2022-09-24 14:32:04
 * @Description: 
 */
export const transitionProps = {
    // 是否展示组件
    show: {
        type: Boolean,
        default: false
    },
    // 使用的动画模式
    mode: {
        type: String,
        default: 'fade'
    },
    customStyle: {
        type: Object
    },
    // 动画的执行时间，单位ms
    duration: {
        type: [Number],
        default: 300
    },
    // 使用的动画过渡函数
    timingFunction: {
        type: String,
        default: 'ease-out'
    }
}