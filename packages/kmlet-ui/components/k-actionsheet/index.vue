<template>
    <view v-if="isShow || !isNvue" @touchmove.stop.prevent="preventEvent">
        <view class="k-actionsheet__mask" :class="{ 'k-actionsheet__mask-show': show }" ref="fui_asm_ani"
            @tap="handleClickMask" :style="getStyle"></view>
        <view class="k-actionsheet__wrap"
            :class="{ 'k-actionsheet__show': show, 'k-actionsheet__radius': radius, 'k-as__bg-light': theme === 'light', 'k-as__bg-dark': theme === 'dark' }"
            ref="fui_as_ani" :style="{ zIndex: zIndex }">
            <text class="k-actionsheet__tips"
                :class="{ 'k-actionsheet__radius': radius, 'k-as__btn-light': theme === 'light', 'k-as__btn-dark': theme === 'dark' }"
                :style="{ fontSize: size + 'rpx', color: color }" v-if="tips">{{ tips }}</text>
            <view :class="{ 'k-actionsheet__operate-box': isCancel }">
                <text class="k-actionsheet__btn"
                    :style="{ color: theme === 'dark' ? (item.darkColor || '#D1D1D1') : (item.color || '#181818'), fontSize: itemSize + 'rpx' }"
                    :class="{ 'k-actionsheet__btn-last': !isCancel && index == vals.length - 1, 'k-as__safe-weex': !isCancel && index == vals.length - 1 && iphoneX && safeArea, 'k-actionsheet__radius': radius && !tips && index === 0, 'k-as__divider-light': (index !== 0 || tips) && theme === 'light', 'k-as__divider-dark': (index !== 0 || tips) && theme === 'dark', 'k-as__btn-light': theme === 'light', 'k-as__btn-dark': theme === 'dark' }"
                    v-for="(item, index) in vals" :key="index" @tap="handleClickItem(index)">{{ item.text }}</text>
            </view>
            <text :style="{ color: theme === 'dark' ? '#D1D1D1' : '#181818', fontSize: itemSize + 'rpx' }"
                class="k-actionsheet__btn k-actionsheet__cancel"
                :class="{ 'k-as__safe-weex': iphoneX && safeArea, 'k-as__btn-light': theme === 'light', 'k-as__btn-dark': theme === 'dark' }"
                v-if="isCancel" @tap="handleClickCancel">取消</text>
        </view>
    </view>
</template>
  
<script>
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation');
// #endif
export default {
    name: "k-actionsheet",
    emits: ['click', 'cancel'],
    props: {
        //是否显示操作菜单
        show: {
            type: Boolean,
            default: false
        },
        //菜单按钮数组，可自定义文本颜色
        itemList: {
            type: Array,
            default() {
                return []
            }
        },
        //菜单按钮字体大小 rpx
        itemSize: {
            type: [Number, String],
            default: 32
        },
        //提示信息
        tips: {
            type: String,
            default: ""
        },
        //提示信息文本颜色
        color: {
            type: String,
            default: "#7F7F7F"
        },
        //提示文字大小 rpx
        size: {
            type: [Number, String],
            default: 26
        },
        //是否需要圆角
        radius: {
            type: Boolean,
            default: true
        },
        //是否需要取消按钮
        isCancel: {
            type: Boolean,
            default: true
        },
        //light/dark
        theme: {
            type: String,
            default: 'light'
        },
        //点击遮罩 是否可关闭
        maskClosable: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: [Number, String],
            default: 1001
        },
        //是否适配底部安全区
        safeArea: {
            type: Boolean,
            default: true
        }
    },
    data() {
        let isNvue = false;
        // #ifdef APP-NVUE
        isNvue = true;
        // #endif
        return {
            iphoneX: false,
            vals: [],
            isNvue: isNvue,
            isShow: false
        }
    },
    computed: {
        getStyle() {
            return `z-index:${Number(this.zIndex) - 1};`
        }
    },
    watch: {
        // #ifdef APP-NVUE
        show: {
            handler(newVal) {
                if (newVal) {
                    this.open();
                } else {
                    this.close();
                }
            },
            immediate: true
        },
        // #endif
        itemList(newVal) {
            this.initData(newVal)
        }
    },
    created() {
        // #ifdef APP-NVUE || MP-TOUTIAO
        this.iphoneX = this.isPhoneX();
        // #endif
        this.initData(this.itemList)
    },
    methods: {
        initData(vals) {
            if (vals && vals.length > 0) {
                if (typeof vals[0] !== 'object') {
                    vals = vals.map(item => {
                        return {
                            text: item
                        }
                    })
                }
                this.vals = vals;
            }
        },
        handleClickMask() {
            if (!this.maskClosable) return;
            this.handleClickCancel();
        },
        handleClickItem(index) {
            if (!this.show) return;
            this.$emit('click', {
                index: index,
                ...this.vals[index]
            });
        },
        handleClickCancel() {
            this.$emit('cancel');
        },
        // #ifdef APP-NVUE
        open() {
            this.isShow = true;
            this.$nextTick(() => {
                setTimeout(() => {
                    this._animation(true);
                }, 50);
            })
        },
        close() {
            this._animation(false);
        },
        _animation(type) {
            if (!this.$refs['fui_asm_ani'] || !this.$refs['fui_as_ani']) return;
            let styles = {
                transform: `translateY(${type ? '0' : '100%'})`,
                opacity: type ? 1 : 0
            }
            animation.transition(
                this.$refs['fui_asm_ani'].ref, {
                styles: {
                    opacity: type ? 1 : 0
                },
                duration: 100,
                timingFunction: 'ease-in-out',
                needLayout: false,
                delay: 0 //ms
            },
                () => { }
            );
            animation.transition(
                this.$refs['fui_as_ani'].ref, {
                styles,
                duration: 100,
                timingFunction: 'ease-in-out',
                needLayout: false,
                delay: 0 //ms
            },
                () => {
                    if (!type) {
                        this.isShow = false
                    }
                }
            );
        },
        // #endif
        // #ifdef APP-NVUE || MP-TOUTIAO
        isPhoneX() {
            if (!this.safeArea) return false;
            //34px
            const res = uni.getSystemInfoSync();
            let iphonex = false;
            let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax',
                'iphone12', 'iphone12mini', 'iphone12pro', 'iphone12promax', 'iphone13', 'iphone13mini',
                'iphone13pro', 'iphone13promax', 'iphone14', 'iphone14mini',
                'iphone14pro', 'iphone14promax'
            ]
            const model = res.model.replace(/\s/g, "").toLowerCase()
            const newModel = model.split('<')[0]
            if (models.includes(model) || models.includes(newModel) || (res.safeAreaInsets && res.safeAreaInsets
                .bottom > 0)) {
                iphonex = true;
            }
            return iphonex;
        },
        // #endif

        // 阻止事件冒泡
        preventEvent(e) {
            e && typeof (e.stopPropagation) === 'function' && e.stopPropagation()
        },

    }
}
</script>
  
<style scoped>
.k-actionsheet__wrap {
    /* #ifndef APP-NVUE */
    width: 100%;
    visibility: hidden;
    min-height: 100rpx;

    /* #endif */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* #ifndef APP-NVUE */
    transform: translate3d(0, 100%, 0);
    transition: all .25s ease-in-out;

    /* #endif */

    /* #ifdef APP-NVUE */
    transition-property: transform;
    transform: translateY(100%);

    /* #endif */
    transform-origin: center center;
}

.k-as__bg-light {
    background-color: #f8f8f8;
}

.k-as__bg-dark {
    background-color: #111;
}

.k-actionsheet__radius {
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;

    /* #ifndef APP-NVUE */
    overflow: hidden;

    /* #endif */
}

/* #ifndef APP-NVUE */
.k-actionsheet__show {
    transform: translate3d(0, 0, 0);
    visibility: visible;
}

/* #endif */

.k-actionsheet__tips {
    /* #ifndef APP-NVUE */
    width: 100%;
    box-sizing: border-box;

    /* #endif */
    flex: 1;
    padding: 40rpx 60rpx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: normal;
}

.k-as__btn-light {
    background-color: #fff;
}

.k-as__btn-dark {
    background-color: #222;
}

.k-actionsheet__operate-box {
    padding-bottom: 12rpx;
}

.k-actionsheet__btn {
    /* #ifndef APP-NVUE */
    width: 100%;

    /* #endif */
    flex: 1;
    height: 100rpx;

    /* #ifdef APP-NVUE */
    line-height: 100rpx;

    /* #endif */

    /* #ifndef APP-NVUE */
    display: flex;

    /* #endif */
    align-items: center;
    justify-content: center;
    text-align: center;

    /* font-size: 32rpx; */
    font-weight: normal;
    position: relative;

    /* #ifdef H5 */
    cursor: pointer;

    /* #endif */
}

.k-actionsheet__btn:active {
    /* #ifdef APP-NVUE */
    background-color: rgba(0, 0, 0, .2);

    /* #endif */

    /* #ifndef APP-NVUE */
    background-color: var(--k-bg-color-hover, rgba(0, 0, 0, .2)) !important;

    /* #endif */
}

.k-actionsheet__btn-last {
    /* #ifndef APP-NVUE || MP-TOUTIAO */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    /* #endif */
}

/* #ifdef APP-NVUE */
.k-as__divider-light {
    border-top-width: .5px;
    border-top-style: solid;
    border-top-color: #eee;
}

.k-as__divider-dark {
    border-top-width: .5px;
    border-top-style: solid;
    border-top-color: #333;
}

/* #endif */

/* #ifndef APP-NVUE */

.k-as__divider-light::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-top: 1px solid var(--k-color-border, #eee);
    transform: scaleY(.5);
    transform: scaleY(.5);
    transform-origin: 0 0;
    z-index: 2;
    pointer-events: none;
}

.k-as__divider-dark::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-top: 1px solid #333;
    transform: scaleY(.5);
    transform: scaleY(.5);
    transform-origin: 0 0;
    z-index: 2;
    pointer-events: none;
}

/* #endif */

.k-actionsheet__cancel {
    /* #ifndef APP-NVUE */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    /* #endif */
}

/* #ifdef APP-NVUE || MP-TOUTIAO */
.k-as__safe-weex {
    padding-bottom: 34px;
}

/* #endif */

.k-actionsheet__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    /* #ifndef APP-NVUE */
    background-color: var(--k-bg-color-mask, rgba(0, 0, 0, .6));

    /* #endif */

    /* #ifdef APP-NVUE */
    background-color: rgba(0, 0, 0, .6);

    /* #endif */

    /* #ifndef APP-NVUE */
    transition: opacity .3s ease-in-out;
    opacity: 0;
    visibility: hidden;

    /* #endif */
}

.k-actionsheet__mask-show {
    /* #ifndef APP-NVUE */
    visibility: visible;
    opacity: 1;

    /* #endif */
}
</style>
  