/*
 * @Author       : Mx
 * @Date         : 2022-09-26 17:03:46
 * @Description  : 
 */
export const inputNumberProps = {
    modelValue: {
        type: [Number, String],
        default: 1
    },
    //最小值
    min: {
        type: Number,
        default: 1
    },
    //最大值
    max: {
        type: Number,
        default: 99
    },
    //每次点击改变的间隔大小
    step: {
        type: Number,
        default: 1
    },
    //是否禁用操作
    disabled: {
        type: Boolean,
        default: false
    },
    //加减号宽度，单位rpx
    signWidth: {
        type: [Number, String],
        default: 24
    },
    //加减号颜色
    signColor: {
        type: String,
        default: '#181818'
    },
    //索引值，列表中使用
    index: {
        type: [Number, String],
        default: 0
    },
    //自定义参数
    params: {
        type: [Number, String],
        default: 0
    }
}