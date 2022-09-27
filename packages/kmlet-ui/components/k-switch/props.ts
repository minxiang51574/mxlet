/*
 * @Author       : Mx
 * @Date         : 2022-09-27 09:44:54
 * @Description  : 
 */
export const switchProps = {
    //开关选择器名称
    name: {
        type: String,
        default: ''
    },
    checked: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    //样式，有效值：switch, checkbox
    type: {
        type: String,
        default: 'switch'
    },
    //switch选中颜色
    color: {
        type: String,
        // #ifdef MP-WEIXIN
        default: "#FD6846",
        // #endif

        // #ifdef H5
        default: "#1C87FF"
        // #endif

    },
    //边框颜色，type=checkbox时生效
    borderColor: {
        type: String,
        default: '#ccc'
    },
    //对号颜色，type=checkbox时生效
    checkMarkColor: {
        type: String,
        default: '#fff'
    },
    scaleRatio: {
        type: [Number, String],
        default: 1
    }
}