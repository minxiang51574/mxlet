<!--
 * @Author       : Mx
 * @Date         : 2022-08-18 20:20:57
 * @Description  : Switch 开关
--> 
<template>
    <view class="k-switch__input" @tap.stop.prevent
        :style="{ zoom: isNvue ? 1 : scaleRatio, transform: `scale(${isNvue ? scaleRatio : 1})` }">
        <!-- #ifdef APP-NVUE -->
        <switch v-if="type === 'switch'" @change="change" :name="name" :checked="val" :disabled="disabled"
            :color="color || '#465CFF'">
        </switch>
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <view class="k-switch__input-def" :style="{ background: val ? color : ''}"
            :class="{ 'k-switch__input--checked': val, 'k-checkbox__disabled': disabled, 'k-switch__color': val && !color }"
            v-if="type === 'switch'">
            <switch class="k-switch__hidden" @change="change" :name="name" :checked="val" :disabled="disabled"
                :color="color">
            </switch>
        </view>
        <!-- #endif -->
        <view class="k-checkbox__self" :class="{ 'k-checkbox__disabled': disabled, 'k-switch__color': !color && val }"
            :style="{ background: val ? color : '#fff' }" v-else>
            <view class="k-check__mark" :style="{ borderBottomColor: checkMarkColor, borderRightColor: checkMarkColor }"
                v-if="val"></view>
            <switch class="k-switch__hidden" @change="change" :name="name" :type="isNvue ? 'switch' : 'checkbox'"
                :checked="val" :disabled="disabled"></switch>
        </view>
    </view>
</template>

<script>
export default {
    name: "k-switch",
    props: {
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
    },
    data() {
        let isNvue = false;
        // #ifdef APP-NVUE
        isNvue = true;
        // #endif
        return {
            val: false,
            isNvue: isNvue
        };
    },
    watch: {
        checked(val) {
            this.val = val;
        }
    },
    created() {
        this.val = this.checked;
        this.label = this.getParent();
        if (this.label) {
            this.label.childrens.push(this)
        }
    },
    methods: {
        change(e, label) {
            // if (this.label && !label) return;
            this.val = e.detail.value;
            this.$emit('change', e)
        },
        labelClick() {
            if (this.disabled) return;
            let e = {
                detail: {
                    value: !this.val
                }
            }
            this.change(e, true)
        },
        getParent(name = 'k-label') {
            let parent = this.$parent;
            let parentName = parent.$options.name;
            while (parentName !== name) {
                parent = parent.$parent;
                if (!parent) return false;
                parentName = parent.$options.name;
            }
            return parent;
        }
    }
}
</script>

<style lang='scss' scoped>
/* #ifndef APP-NVUE */
.k-switch__input {
    display: inline-block;
}

/* #endif */

.k-checkbox__self {
    font-size: 0;
    width: 40rpx;
    height: 40rpx;
    /* #ifdef APP-NVUE */
    border-radius: 40rpx;
    /* #endif */
    /* #ifndef APP-NVUE */
    border-radius: 50%;
    display: inline-flex;
    box-sizing: border-box;
    vertical-align: top;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

/* #ifndef APP-NVUE */
.k-switch__input-def {
    position: relative;
    width: 52px;
    height: 30px;
    // border: 1px solid #CCCCCC;
    outline: 0;
    border-radius: 16px;
    box-sizing: border-box;
    transition: background-color .1s, border .1s;
}

.k-switch__input-def::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 52px;
    height: 30px;
    border-radius: 15px;
    background-color: #D4D9E1;
    transition: transform .3s
}

.k-switch__input-def::after {
    content: " ";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    transition: transform .3s
}

.k-switch__input--checked::before {
    transform: scale(0)
}

.k-switch__input--checked::after {
    transform: translateX(22px)
}

.k-switch__color {

    /*  #ifdef  MP-WEIXIN */
    background: $k-mp-primary-color !important;
    border-color: $k-mp-primary-color !important;
    /*  #endif  */

    /*  #ifdef  H5 */
    background: $k-h-primary-color !important;
    border-color: $k-h-primary-color !important;
    /*  #endif  */

}

/* #endif */

/* #ifdef H5 || APP-VUE */
.uni-switch-input {
    margin-right: 0 !important;
}

/* #endif */

/* #ifdef APP-NVUE */
.uni-switch-input {
    margin-right: 0 !important;
}

/* #endif */

/* #ifdef MP-WEIXIN */
.wx-switch-input {
    margin-right: 0 !important;
}

/* #endif */

.k-check__mark {
    width: 20rpx;
    height: 40rpx;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: #FFFFFF;
    border-right-style: solid;
    border-right-width: 3px;
    border-right-color: #FFFFFF;
    transform: rotate(45deg) scale(0.5);
    transform-origin: 54% 48%;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
}

.k-switch__hidden {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 2;
    /* #ifndef APP-NVUE */
    width: 100%;
    height: 100%;
    border: 0 none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* #endif */

    /* #ifdef APP-NVUE */
    width: 100wx;
    height: 100wx;
    border-width: 0;
    /* #endif */
}

// 禁用
.k-checkbox__disabled {

    // opacity: 0.6;
    &.k-switch__input-def::before {
        background: $neutral-color-bg-color !important;
    }

    &.k-switch__input--checked {
        /*  #ifdef  MP-WEIXIN */
        background-color: $base-color1-Brand-3 !important;

        /*  #endif  */

        /*  #ifdef  H5  */
        background-color: $base-color2-Brand-3 !important;
        /*  #endif  */
    }
}
</style>
