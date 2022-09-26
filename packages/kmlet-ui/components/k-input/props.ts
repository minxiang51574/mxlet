export const inputProps = {
    // 输入的值
    modelValue: {
        type: [String, Number],
        default: ""
    },
    width: {
        type: [String, Number],
        default: ''
    },
    // 输入框类型
    // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
    // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
    // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
    // te                       xt-文本输入键盘
    type: {
        type: String,
        default: 'text',
    },
    // 是否禁用输入框
    disabled: {
        type: Boolean,
        default: false
    },
    // 禁用状态时的背景色
    disabledColor: {
        type: String,
        default: 'none'
    },
    // 是否显示清除控件
    clearable: {
        type: Boolean,
        default: false
    },
    // 输入框形状，circle-圆形，square-方形
    shape: {
        type: String,
        default: "square"
    },
    // 是否密码类型
    password: {
        type: Boolean,
        default: false
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
        type: [String, Number],
        default: -1
    },
    // 	输入框为空时的占位符
    placeholder: {
        type: String,
        default: ''
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
        type: String,
        default: 'input-placeholder'
    },
    // 指定placeholder的样式
    placeholderStyle: {
        type: [String, Object],
        default: "color:#B8BABE"
    },
    // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
    showWordLimit: {
        type: Boolean,
        default: false
    },
    // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
    // https://uniapp.dcloud.io/component/input
    // https://uniapp.dcloud.io/component/textarea
    confirmType: {
        type: String,
        default: 'done'
    },
    // 输入框字体的大小
    fontSize: {
        type: [String, Number],
        default: '32rpx'
    },
    // 输入框字体颜色
    color: {
        type: String,
        default: '#31353C'
    },
    // 输入框前置图标
    prefixIcon: {
        type: String,
        default: ''
    },
    // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
    border: {
        type: String,
        default: 'surround'
    },
    // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
    readonly: {
        type: Boolean,
        default: false
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
        type: [Function, null],
        default: null
    },
    inputAlign: {
        type: String,
        default: 'left'
    },

}