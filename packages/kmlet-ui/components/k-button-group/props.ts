/*
 * @Author: Mx
 * @Date: 2022-09-23 17:14:43
 * @Description: Button 按钮组 props
 */
export const iconProps = {
    cancelText: {
        type: String,
        default: '取消'
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    showCancelButton: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    fixed: {
        type: Boolean,
        default: false
    }
}