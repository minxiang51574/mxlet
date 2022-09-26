/*
 * @Author       : Mx
 * @Date         : 2022-09-26 16:29:16
 * @Description  : 
 */
export const listCellProps = {
    //padding值，上、右、下、左,nvue下padding-right(右)无效
    padding: {
        type: Array,
        default() {
            return ['32rpx', '32rpx']
        }
    },
    //margin-top 单位rpx
    marginTop: {
        type: [Number, String],
        default: 0
    },
    //margin-bottom 单位rpx
    marginBottom: {
        type: [Number, String],
        default: 0
    },
    //背景颜色
    // #ifdef APP-NVUE
    background: {
        type: String,
        default: ''
    },
    // #endif
    //是否有点击效果
    highlight: {
        type: Boolean,
        default: false
    },
    //是否需要右侧箭头
    arrow: {
        type: Boolean,
        default: false
    },
    arrowColor: {
        type: String,
        default: '#B2B2B2'
    },
    //是否显示上边框
    topBorder: {
        type: Boolean,
        default: false
    },
    //是否显示下边框
    bottomBorder: {
        type: Boolean,
        default: true
    },
    //边框颜色，非nvue下传值则全局默认样式失效
    // #ifdef APP-NVUE
    borderColor: {
        type: String,
        default: ''
    },
    // #endif
    //上边框left值，单位rpx
    topLeft: {
        type: [Number, String],
        default: 0
    },
    //上边框right值，单位rpx
    topRight: {
        type: [Number, String],
        default: 0
    },
    //下边框left值，单位rpx
    bottomLeft: {
        type: [Number, String],
        default: 32
    },
    //下边框right值，单位rpx
    bottomRight: {
        type: [Number, String],
        default: 0
    },
    //border-radius圆角值
    radius: {
        type: String,
        default: '0'
    },
    index: {
        type: Number,
        default: 0
    },
    justifyContent: {
        type: String,
        default: 'space-between'
    }
}