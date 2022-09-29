/*
 * @Author       : Mx
 * @Date         : 2022-09-29 18:14:47
 * @Description  : 
 */
/*
 * @Author       : Mx
 * @Date         : 2022-09-28 15:24:27
 * @Description  : 
 */
export const checkboxProps = {
    // 默认值
    label: {
        type: [String, Number],
        default: ''
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    //radio选中背景颜色
    activeColor: {
        type: String,
        // #ifdef APP-NVUE
        default: '#465CFF',
        // #endif

        // #ifndef APP-NVUE
        default: ''
        // #endif
    },
    borderRadius: {
        type: String,
        // #ifdef APP-NVUE
        default: '40rpx',
        // #endif

        // #ifndef APP-NVUE
        default: '50%'
        // #endif
    },
    //对号颜色
    checkMarkColor: {
        type: String,
        default: '#fff'
    }
}
