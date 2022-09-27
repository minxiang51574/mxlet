<template>
    <scroll-view class="k-tabs__scrollbox"
        :class="{ 'k-tabs__fixed': isFixed && !isSticky, 'k-tabs__sticky': isSticky }" scroll-with-animation
        :scroll-x="scroll" :show-scrollbar="false" :scroll-into-view="scrollInto"
        :style="{ background: background, zIndex: (isFixed || isSticky) ? zIndex : 1, top: isFixed || isSticky ? top + 'px' : 'auto' }">
        <view class="k-scroll__view" :class="{ 'k-tabs__full': !alignLeft }">
            <view v-for="(tab, index) in vals" :key="index" class="k-tabs__item" :class="{ 'k-tabs__full': !alignLeft }"
                :id="tab.fui_s_id" @tap="switchTab(index)">
                <view class="k-tabs__text-wrap" :class="{ 'k-tabs__wrap-disabled': tab.disabled }"
                    :style="{ height: height + 'rpx' }">
                    <view class="k-tabs__ac-line"
                        :class="{ 'k-tabs__line-short': short, 'k-tabs__slider-color': !sliderBackground }"
                        :style="{ height: sliderHeight + 'rpx', background: sliderBackground, borderRadius: sliderRadius == -1 ? sliderHeight + 'rpx' : sliderRadius + 'rpx', bottom: bottom + 'rpx', transform: `scale(${tabIndex === index ? (isNvue ? 1 : scale) : (isNvue ? 0.00001 : 0)})` }"
                        v-if="isSlider">
                    </view>
                    <text class="k-tabs__text"
                        :class="{ 'k-tabs__selected-color': !selectedColor && tabIndex === index, 'k-tabs__text-color': !color && tabIndex !== index }"
                        :style="{ fontSize: selectedSize + 'rpx', color: tabIndex === index ? selectedColor : color, fontWeight: tabIndex === index ? selectedFontWeight : fontWeight }">{{
                        tab.name
                        }}</text>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
export default {
    name: 'k-tabs',
    props: {
        // 标签页数据源
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        // 当前选项卡
        current: {
            type: Number,
            default: 0
        },
        // 是否可以滚动
        scroll: {
            type: Boolean,
            default: false
        },
        // tab高度 rpx
        height: {
            type: [Number, String],
            default: 96
        },
        background: {
            type: String,
            default: '#fff'
        },
        //字体大小
        size: {
            type: [Number, String],
            default: 28
        },
        //字体颜色
        color: {
            type: String,
            // #ifdef APP-NVUE
            default: '#7F7F7F',
            // #endif
            // #ifndef APP-NVUE
            default: ''
            // #endif
        },
        //选中前字重
        fontWeight: {
            type: [Number, String],
            default: 'normal'
        },
        //仅Nvue端生效，代替scale属性
        selectedSize: {
            type: [Number, String],
            default: 32
        },
        //选中后字体颜色
        selectedColor: {
            type: String,
            // #ifdef APP-NVUE
            default: '#465CFF',
            // #endif
            // #ifndef APP-NVUE
            default: ''
            // #endif
        },
        //选中后字重 
        selectedFontWeight: {
            type: [Number, String],
            default: 500
        },
        //选中后字体缩放倍数
        //Nvue端 Android 暂不支持设置overflow:visible，放大后文字超出部分被隐藏
        scale: {
            type: [Number, String],
            default: 1.2
        },
        badgeColor: {
            type: String,
            default: '#fff'
        },
        badgeBackground: {
            type: String,
            // #ifdef APP-NVUE
            default: '#FF2B2B',
            // #endif
            // #ifndef APP-NVUE
            default: ''
            // #endif
        },
        isSlider: {
            type: Boolean,
            default: true
        },
        //滑块高度
        sliderHeight: {
            type: [Number, String],
            default: 5
        },
        //滑块背景颜
        sliderBackground: {
            type: String,
            // #ifdef APP-NVUE
            default: '#465CFF',
            // #endif
            // #ifndef APP-NVUE
            default: ''
            // #endif
        },
        //滑块 radius
        sliderRadius: {
            type: [Number, String],
            default: -1
        },
        //滑块左右padding值
        padding: {
            type: [Number, String],
            default: 0
        },
        //滑块bottom
        bottom: {
            type: [Number, String],
            default: 0
        },
        //滑块是否固定为较短的长度45rpx
        short: {
            type: Boolean,
            default: true
        },
        //是否固定
        isFixed: {
            type: Boolean,
            default: false
        },
        //吸顶效果，为true时isFixed失效
        isSticky: {
            type: Boolean,
            default: false
        },
        //isFixed或isSticky为true时，tabs top值 px
        top: {
            type: [Number, String],
            // #ifndef H5
            default: 0,
            // #endif
            // #ifdef H5
            default: 44
            // #endif
        },
        //当数据不满一屏时，item项是否靠左对齐，默认均分铺满
        alignLeft: {
            type: Boolean,
            default: false
        },
        //tabs item项排列方式：row、column
        direction: {
            type: String,
            default: 'row'
        },
        zIndex: {
            type: [Number, String],
            default: 996
        }
    },
    watch: {
        tabs(vals) {
            this.initData(vals)
        },
        current(newVal, oldVal) {
            this.switchTab(newVal);
        }
    },
    created() {
        this.initData(this.tabs)
    },
    data() {
        let isNvue = false;
        // #ifdef APP-NVUE
        isNvue = true;
        // #endif
        return {
            vals: [],
            scrollInto: '',
            tabIndex: 0,
            isNvue: isNvue
        };
    },
    methods: {
        getId() {
            return `fui_${Math.ceil(Math.random() * 10e5).toString(36)}`
        },
        initData(vals) {
            if (vals && vals.length > 0) {
                if (typeof vals[0] === 'object') {
                    vals.map(item => {
                        const scrollId = this.getId()
                        item.fui_s_id = scrollId;
                    });
                } else {
                    //字符串
                    vals = vals.map(item => {
                        const scrollId = this.getId()
                        return {
                            name: item,
                            fui_s_id: scrollId
                        }
                    })
                }
                this.vals = vals;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.switchTab(this.current)
                    }, 50)
                })
            }
        },
        switchTab(index) {
            const item = {
                ...this.vals[index]
            }
            if (this.tabIndex === index || item.disabled) return;
            this.tabIndex = index;
            let scrollIndex = index - 1 < 0 ? 0 : index - 1;
            this.scrollInto = this.vals[scrollIndex].fui_s_id;
            delete item.fui_s_id;
            this.$emit('change', {
                index: index,
                ...item
            })
        }
    }
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    color: transparent !important;
    display: none;
}

/* #endif */
.k-tabs__scrollbox {
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
    flex: 1;
    flex-direction: row;
    overflow: hidden;
}

.k-tabs__fixed {
    position: fixed;
    left: 0;
    right: 0;
}

.k-tabs__sticky {
    position: sticky;
    left: 0;
    right: 0;
}

.k-scroll__view {
    /* #ifndef APP-NVUE */
    min-width: 100%;
    white-space: nowrap;
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
}


.k-tabs__item {
    /* #ifndef APP-NVUE */
    display: flex;
    flex-shrink: 0;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 32rpx;
    padding-right: 32rpx;
    position: relative;

}

.k-tabs__full {
    flex: 1;
}

.k-tabs__text-wrap {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */
    z-index: 3;
}

.k-tabs__wrap-disabled {
    /* #ifdef H5 */
    cursor: not-allowed;
    /* #endif */
    opacity: 0.5;
}

.k-tabs__icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 12rpx;
}

.k-tabs__icon-column {
    margin-right: 0 !important;
    margin-bottom: 8rpx;
}

.k-tabs__text {
    /* #ifndef APP-NVUE */
    white-space: nowrap;
    display: block;
    /* #endif */
    /* #ifdef APP-NVUE */
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* #endif */
    transition: transform 0.2s linear;
    /* transform-origin: center center; */
    position: relative;
    z-index: 3;
}

.k-tabs__badge {
    height: 36rpx;
    padding: 0 12rpx;
    color: #FFFFFF;
    font-size: 24rpx;
    line-height: 36rpx;
    border-radius: 100px;
    /* #ifndef APP-NVUE */
    min-width: 36rpx !important;
    display: flex;
    box-sizing: border-box;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -32rpx;
    top: -18rpx;
    transform: scale(0.9);
    z-index: 10;
}

.k-tabs__badge-dot {
    height: 8px !important;
    width: 8px !important;
    /* #ifdef APP-NVUE */
    border-radius: 100px;
    /* #endif */

    /* #ifndef APP-NVUE */
    display: inline-block;
    /* #endif */
    background-color: red;
    /* #ifndef APP-NVUE */
    border-radius: 50%;
    /* #endif */
    position: absolute;
    right: -6px;
    top: -3px;
    z-index: 10;
    /* transform: scale(0.9); */
}

.k-tabs__ac-line {
    position: absolute;
    border-radius: 2px;
    z-index: 2;
    transition: transform 0.2s linear;
}

.k-tabs__line-short {
    width: 45rpx !important;
}

/* #ifndef APP-NVUE */
.k-tabs__selected-color {
    color: #31353C;
}

.k-tabs__text-color {
    color: #64676D;
}

.k-tabs__slider-color {

    /*  #ifdef  MP-WEIXIN */
    background: $k-mp-primary-color !important;
    /*  #endif  */

    /*  #ifdef  H5 */
    background: $k-h-primary-color !important;
    /*  #endif  */
}

/* #endif */
</style>
