<template>
    <view class="k-calendar-month-wrapper" ref="k-calendar-month-wrapper">
        <view v-for="(item, index) in months" :key="index" :class="[`k-calendar-month-${index}`]"
            :ref="`k-calendar-month-${index}`" :id="`month-${index}`" :style="{marginTop:'30rpx'}">
            <!-- <text v-if="index !== 0" class="k-calendar-month__title">{{ item.year }}年{{ item.month }}月</text> -->
            <text class="k-calendar-month__title">{{ item.month }}月</text>
            <view class="k-calendar-month__days">
                <view v-if="showMark" class="k-calendar-month__days__month-mark-wrapper">
                    <text class="k-calendar-month__days__month-mark-wrapper__text">{{ item.month }}</text>
                </view>
                <view class="k-calendar-month__days__day" v-for="(item1, index1) in item.date" :key="index1"
                    :style="[dayStyle(index, index1, item1)]" @tap="clickHandler(index, index1, item1)"
                    :class="[item1.selected && 'k-calendar-month__days__day__select--selected']">
                    <view class="k-calendar-month__days__day__select" :style="[daySelectStyle(index, index1, item1)]">
                        <text class="k-calendar-month__days__day__select__info"
                            :class="[item1.disabled && 'k-calendar-month__days__day__select__info--disabled']"
                            :style="[textStyle(item1)]">{{ item1.day }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// #ifdef APP-NVUE
// 由于nvue不支持百分比单位，需要查询宽度来计算每个日期的宽度
const dom = uni.requireNativePlugin('dom')
// #endif
import dayjs from 'dayjs'

export default {
    name: 'k-calendar-month',
    props: {
        // 是否显示日历弹窗
        show: {
            type: Boolean,
            default: false
        },
        // 是否显示月份背景色
        showMark: {
            type: Boolean,
            default: true
        },
        // 主题色，对底部按钮和选中日期有效
        color: {
            type: String,
            // #ifdef MP-WEIXIN
            default: '#FD6846',
            // #endif

            // #ifdef H5
            default: '#1C87FF'
            // #endif
        },
        // 月份数据
        months: {
            type: Array,
            default: () => []
        },
        // 日期选择类型
        modeType: {
            type: String,
            default: 'single'
        },
        // 日期行高
        rowHeight: {
            type: [String, Number],
            default: 50
        },
        // modeType=multiple时，最多可选多少个日期
        maxCount: {
            type: [String, Number],
            default: Infinity
        },
        // 默认选中的日期，modeType为multiple或range是必须为数组格式
        defaultDate: {
            type: [Array, String, Date],
            default: null
        },
        // 最小的可选日期
        minDate: {
            type: [String, Number],
            default: 0
        },
        // 最大可选日期
        maxDate: {
            type: [String, Number],
            default: 0
        },
        // 如果没有设置maxDate，则往后推多少个月
        maxMonth: {
            type: [String, Number],
            default: 2
        },
        // 是否为只读状态，只读状态下禁止选择日期
        readonly: {
            type: Boolean,
            default: false
        },
        // 日期区间最多可选天数，默认无限制，modeType = range时有效
        maxRange: {
            type: [Number, String],
            default: Infinity
        },
        // 范围选择超过最多可选天数时的提示文案，modeType = range时有效
        rangePrompt: {
            type: String,
            default: ''
        },
        // 范围选择超过最多可选天数时，是否展示提示文案，modeType = range时有效
        showRangePrompt: {
            type: Boolean,
            default: true
        },
        // 是否允许日期范围的起止时间为同一天，modeType = range时有效
        allowSameDay: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // 每个日期的宽度
            width: 0,
            // 当前选中的日期item
            item: {},
            selected: []
        }
    },
    watch: {
        selectedChange: {
            immediate: true,
            handler(n) {
                this.setDefaultDate()
            }
        },
        // 小程序与h5中 mounted调用时机不一样 
        show(newVal) {
            this.init()
        }
    },
    computed: {
        // 多个条件的变化，会引起选中日期的变化，这里统一管理监听
        selectedChange() {
            return [this.minDate, this.maxDate, this.defaultDate]
        },
        dayStyle(index1, index2, item) {
            return (index1, index2, item) => {
                const style = {}
                let week = item.week
                // 不进行四舍五入的形式保留2位小数
                const dayWidth = Number(parseFloat(this.width / 7).toFixed(3).slice(0, -1))
                // 得出每个日期的宽度
                // #ifdef APP-NVUE
                style.width = dayWidth + 'px'
                // #endif
                style.height = this.rowHeight + 'px'
                if (index2 === 0) {
                    // 获取当前为星期几，如果为0，则为星期天，减一为每月第一天时，需要向左偏移的item个数
                    week = (week === 0 ? 7 : week) - 1
                    style.marginLeft = week * dayWidth + 'px'

                }
                if (this.modeType === 'range') {
                    // 之所以需要这么写，是因为DCloud公司的iOS客户端的开发者能力有限导致的bug
                    style.paddingLeft = 0
                    style.paddingRight = 0
                    style.paddingBottom = 0
                    style.paddingTop = 0
                }
                style.marginTop = 10 + 'rpx'
                return style
            }
        },
        daySelectStyle() {
            return (index1, index2, item) => {
                let date = dayjs(item.date).format("YYYY-MM-DD"),
                    style = {}
                // 判断date是否在selected数组中，因为月份可能会需要补0，所以使用dateSame判断，而不用数组的includes判断
                if (this.selected.some(item => this.dateSame(item, date))) {
                    style.backgroundColor = this.color
                }
                if (this.modeType === 'single') {
                    if (date === this.selected[0]) {
                        // 因为需要对nvue的兼容，只能这么写，无法缩写，也无法通过类名控制等等
                        style.borderTopLeftRadius = '4px'
                        style.borderBottomLeftRadius = '4px'
                        style.borderTopRightRadius = '4px'
                        style.borderBottomRightRadius = '4px'
                    }
                } else if (this.modeType === 'range') {
                    if (this.selected.length >= 2) {
                        const len = this.selected.length - 1
                        // 第一个日期设置左上角和左下角的圆角
                        if (this.dateSame(date, this.selected[0])) {
                            style.borderTopLeftRadius = '4px'
                            style.borderBottomLeftRadius = '4px'
                        }
                        // 最后一个日期设置右上角和右下角的圆角
                        if (this.dateSame(date, this.selected[len])) {
                            style.borderTopRightRadius = '4px'
                            style.borderBottomRightRadius = '4px'
                        }
                        // 处于第一和最后一个之间的日期，背景色设置为浅色，通过将对应颜色进行等分，再取其尾部的颜色值
                        if (dayjs(date).isAfter(dayjs(this.selected[0])) && dayjs(date).isBefore(dayjs(this
                            .selected[len]))) {
                            // #ifdef MP-WEIXIN
                            style.backgroundColor = '#FFF5F0'
                            // #endif

                            // #ifdef H5
                            style.backgroundColor = '#E8F7FF'
                            // #endif

                        }
                    } else if (this.selected.length === 1) {
                        // 之所以需要这么写，是因为DCloud公司的iOS客户端的开发者能力有限导致的bug
                        // 进行还原操作，否则在nvue的iOS，uni-app有bug，会导致诡异的表现
                        style.borderTopLeftRadius = '4px'
                        style.borderBottomLeftRadius = '4px'
                    }
                } else {
                    if (this.selected.some(item => this.dateSame(item, date))) {
                        style.borderTopLeftRadius = '4px'
                        style.borderBottomLeftRadius = '4px'
                        style.borderTopRightRadius = '4px'
                        style.borderBottomRightRadius = '4px'
                    }
                }
                return style
            }
        },

        // 某个日期是否被选中
        textStyle() {
            return (item) => {
                const date = dayjs(item.date).format("YYYY-MM-DD"),
                    style = {}
                // 选中的日期，提示文字设置白色
                if (this.selected.some(item => this.dateSame(item, date))) {
                    style.color = '#ffffff'
                }
                if (this.modeType === 'range') {
                    const len = this.selected.length - 1
                    // 如果是范围选择模式，第一个和最后一个之间的日期，文字颜色设置为高亮的主题色
                    if (dayjs(date).isAfter(dayjs(this.selected[0])) && dayjs(date).isBefore(dayjs(this
                        .selected[len]))) {
                        // style.color = this.color
                        style.color = '#31353C'
                    }
                }
                return style
            }
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 初始化默认选中
            this.$emit('monthSelected', this.selected)
            this.$nextTick(() => {
                // 这里需要另一个延时，因为获取宽度后，会进行月份数据渲染，只有渲染完成之后，才有真正的高度
                // 因为nvue下，$nextTick并不是100%可靠的
                this.sleep(10).then(() => {
                    this.getWrapperWidth()
                    this.getMonthRect()
                })
            })
        },
        sleep(value = 30) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, value)
            })
        },
        // 判断两个日期是否相等
        dateSame(date1, date2) {
            return dayjs(date1).isSame(dayjs(date2))
        },
        // 获取月份数据区域的宽度，因为nvue不支持百分比，所以无法通过css设置每个日期item的宽度
        getWrapperWidth() {
            // #ifdef APP-NVUE
            dom.getComponentRect(this.$refs['k-calendar-month-wrapper'], res => {
                this.width = res.size.width
            })
            // #endif
            // #ifndef APP-NVUE
            this.uGetRect('.k-calendar-month-wrapper').then(size => {
                this.width = size.width
            })
            // #endif
        },
        uGetRect(selector, all) {
            return new Promise((resolve) => {
                const query = uni.createSelectorQuery().in(this);
                query[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect((rect) => {
                        if (all && Array.isArray(rect) && rect.length) {
                            resolve(rect)
                        }
                        if (!all && rect) {
                            resolve(rect)
                        }
                    })
                    .exec()
            })
        },
        getMonthRect() {
            // 获取每个月份数据的尺寸，用于父组件在scroll-view滚动事件中，监听当前滚动到了第几个月份
            const promiseAllArr = this.months.map((item, index) => this.getMonthRectByPromise(
                `k-calendar-month-${index}`))

            // 一次性返回
            Promise.all(promiseAllArr).then(
                sizes => {
                    let height = 1
                    const topArr = []
                    for (let i = 0; i < this.months.length; i++) {
                        // 添加到months数组中，供scroll-view滚动事件中，判断当前滚动到哪个月份
                        topArr[i] = height
                        height += sizes[i].height
                    }
                    // 由于微信下，无法通过this.months[i].top的形式(引用类型)去修改父组件的month的top值，所以使用事件形式对外发出
                    console.log('topArr', topArr);
                    this.$emit('updateMonthTop', topArr)
                })
        },
        // 获取每个月份区域的尺寸
        getMonthRectByPromise(el) {
            // #ifndef APP-NVUE
            // 组件内部一般用this.uGetRect，对外的为uni.$u.getRect，二者功能一致，名称不同
            return new Promise(resolve => {
                this.uGetRect(`.${el}`).then(size => {
                    resolve(size)
                })
            })
            // #endif

            // #ifdef APP-NVUE
            // nvue下，使用dom模块查询元素高度
            // 返回一个promise，让调用此方法的主体能使用then回调
            return new Promise(resolve => {
                dom.getComponentRect(this.$refs[el][0], res => {
                    resolve(res.size)
                })
            })
            // #endif
        },
        /**
         * @description 深度克隆
         * @param {object} obj 需要深度克隆的对象
         * @returns {*} 克隆后的对象或者原值（不是对象）
         */
        deepClone(obj) {
            // 对常见的“非”值，直接返回原来值
            if ([null, undefined, NaN, false].includes(obj)) return obj
            if (typeof obj !== 'object' && typeof obj !== 'function') {
                // 原始类型直接返回
                return obj
            }
            const o = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
            for (const i in obj) {
                if (obj.hasOwnProperty(i)) {
                    o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
                }
            }
            return o
        },
        // 点击某一个日期
        clickHandler(index1, index2, item) {
            if (this.readonly) {
                return;
            }
            this.item = item
            const date = dayjs(item.date).format("YYYY-MM-DD")
            if (item.disabled) return
            // 对上一次选择的日期数组进行深度克隆
            let selected = this.deepClone(this.selected)
            if (this.modeType === 'single') {
                // 单选情况下，让数组中的元素为当前点击的日期
                selected = [date]
            } else if (this.modeType === 'multiple') {
                if (selected.some(item => this.dateSame(item, date))) {
                    // 如果点击的日期已在数组中，则进行移除操作，也就是达到反选的效果
                    const itemIndex = selected.findIndex(item => item === date)
                    selected.splice(itemIndex, 1)
                } else {
                    // 如果点击的日期不在数组中，且已有的长度小于总可选长度时，则添加到数组中去
                    if (selected.length < this.maxCount) selected.push(date)
                }
            } else {
                // 选择区间形式
                if (selected.length === 0 || selected.length >= 2) {
                    // 如果原来就为0或者大于2的长度，则当前点击的日期，就是开始日期
                    selected = [date]
                } else if (selected.length === 1) {
                    // 如果已经选择了开始日期
                    const existsDate = selected[0]
                    // 如果当前选择的日期小于上一次选择的日期，则当前的日期定为开始日期
                    if (dayjs(date).isBefore(existsDate)) {
                        selected = [date]
                    } else if (dayjs(date).isAfter(existsDate)) {
                        // 当前日期减去最大可选的日期天数，如果大于起始时间，则进行提示
                        if (dayjs(dayjs(date).subtract(this.maxRange, 'day')).isAfter(dayjs(selected[0])) && this.showRangePrompt) {
                            if (this.rangePrompt) {
                                // uni.$u.toast(this.rangePrompt)
                            } else {
                                // uni.$u.toast(`选择天数不能超过 ${this.maxRange} 天`)
                            }
                            return
                        }
                        // 如果当前日期大于已有日期，将当前的添加到数组尾部
                        selected.push(date)
                        const startDate = selected[0]
                        const endDate = selected[1]
                        const arr = []
                        let i = 0
                        do {
                            // 将开始和结束日期之间的日期添加到数组中
                            arr.push(dayjs(startDate).add(i, 'day').format("YYYY-MM-DD"))
                            i++
                            // 累加的日期小于结束日期时，继续下一次的循环
                        } while (dayjs(startDate).add(i, 'day').isBefore(dayjs(endDate)))
                        // 为了一次性修改数组，避免computed中多次触发，这里才用arr变量一次性赋值的方式，同时将最后一个日期添加近来
                        arr.push(endDate)
                        selected = arr
                    } else {
                        // 选择区间时，只有一个日期的情况下，且不允许选择起止为同一天的话，不允许选择自己
                        if (selected[0] === date && !this.allowSameDay) return
                        selected.push(date)
                    }
                }
            }
            this.setSelected(selected)
        },
        // 设置默认日期
        setDefaultDate() {
            if (!this.defaultDate) {
                // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
                const selected = [dayjs().format("YYYY-MM-DD")]
                return this.setSelected(selected, false)
            }
            let defaultDate = []
            const minDate = this.minDate || dayjs().format("YYYY-MM-DD")
            const maxDate = this.maxDate || dayjs(minDate).add(this.maxMonth - 1, 'month').format("YYYY-MM-DD")
            if (this.modeType === 'single') {
                // 单选模式，可以是字符串或数组，Date对象等
                if (!Object.prototype.toString.call(this.defaultDate) === '[object Array]') {
                    defaultDate = [dayjs(this.defaultDate).format("YYYY-MM-DD")]
                } else {
                    defaultDate = [this.defaultDate[0]]
                }
            } else {
                // 如果为非数组，则不执行
                if (!Object.prototype.toString.call(this.defaultDate) === '[object Array]') return
                defaultDate = this.defaultDate
            }
            // 过滤用户传递的默认数组，取出只在可允许最大值与最小值之间的元素
            defaultDate = defaultDate.filter(item => {
                return dayjs(item).isAfter(dayjs(minDate).subtract(1, 'day')) && dayjs(item).isBefore(dayjs(
                    maxDate).add(1, 'day'))
            })
            this.setSelected(defaultDate, false)
        },
        setSelected(selected, event = true) {
            this.selected = selected
            event && this.$emit('monthSelected', this.selected)
        }
    }
}
</script>

<style lang="scss" scoped>
view,
scroll-view,
swiper-item {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    align-items: stretch;
    align-content: flex-start;
}

.k-calendar-month-wrapper {}

.k-calendar-month {
    &__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 0px 0px 24rpx;
        height: 64rpx;
        font-size: 32rpx;
        line-height: 45rpx;
        color: #31353C;
        /* 中性色/背景色/1-背景色 */
        background: #F3F6F9;
        border-radius: 8rpx;
    }

    &__days {
        position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        flex-wrap: wrap;

        &__month-mark-wrapper {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            justify-content: center;
            align-items: center;

            &__text {
                font-size: 155px;
                color: rgba(231, 232, 234, 0.83);
            }
        }

        &__day {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            padding: 2px;
            /* #ifndef APP-NVUE */
            // vue下使用css进行宽度计算，因为某些安卓机会无法进行js获取父元素宽度进行计算得出，会有偏移
            width: calc(100% / 7);
            box-sizing: border-box;
            /* #endif */

            &__select {
                flex: 1;
                /* #ifndef APP-NVUE */
                display: flex;
                /* #endif */
                flex-direction: row;
                align-items: center;
                justify-content: center;
                position: relative;

                &__dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 100px;
                    background-color: #f56c6c;
                    position: absolute;
                    top: 12px;
                    right: 7px;
                }

                &__buttom-info {
                    color: #606266;
                    text-align: center;
                    position: absolute;
                    bottom: 5px;
                    font-size: 10px;
                    text-align: center;
                    left: 0;
                    right: 0;

                    &--selected {
                        color: #ffffff;
                    }

                    &--disabled {
                        color: #cacbcd;
                    }
                }

                &__info {
                    text-align: center;
                    font-size: 16px;

                    &--selected {
                        color: #ffffff;
                    }

                    &--disabled {
                        color: #cacbcd;
                    }
                }

                &--selected {
                    background-color: #3c9cff;
                    /* #ifndef APP-NVUE */
                    display: flex;
                    /* #endif */
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    border-radius: 4px;
                }

                &--range-selected {
                    opacity: 0.3;
                    border-radius: 0;
                }

                &--range-start-selected {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &--range-end-selected {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
    }
}
</style>
