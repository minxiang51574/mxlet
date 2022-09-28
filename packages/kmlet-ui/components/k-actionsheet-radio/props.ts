/*
 * @Author       : Mx
 * @Date         : 2022-09-28 17:40:08
 * @Description  : 
 */
export const actionsheetRadioProps = {
    modelValue: {
        type: [String, Number],
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    radioItems: {
        type: Array,
        default() {
            return []
        }
    },
    //标题
    title: {
        type: String,
        default: ""
    },
}