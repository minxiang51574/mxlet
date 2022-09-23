import { PropType } from "vue"
export const props = {
    // 类型
    type: {
        type: String as PropType<'default' | 'primary'>,
        default: 'default'
    },
    // 尺寸
    size: {
        type: String as PropType<'large' | 'normal' | 'small'>,
        default: 'normal'
    },
    // 是否为块级元素
    block: {
        type: Boolean,
        default: false
    },
    // 是否镂空（次要按钮）
    plain: {
        type: Boolean,
        default: false
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 是否带loading
    loading: {
        type: Boolean,
        default: false
    },
    // loading文案
    loadingText: {
        type: String,
        default: '加载中'
    },
    // 形状
    shape: {
        type: String as PropType<'square' | 'round'>,
        default: ''
    },
}