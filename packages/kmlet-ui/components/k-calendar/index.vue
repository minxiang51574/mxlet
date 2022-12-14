<!--
 * @Author       : Mx
 * @Date         : 2022-08-22 11:25:01
 * @Description  : Calendar 日历
-->
<template>
    <kPopup :show="show" mode="bottom" closeable @close="closePopup" :round="round"
        :closeOnClickOverlay="closeOnClickOverlay">
        <view class="k-calendar">
            <Header :title="title" :subtitle="subtitle" :showSubtitle="showSubtitle" :showTitle="showTitle"
                @cancel="close"></Header>

            <scroll-view :style="{
                height: listHeight + 'px'
            }" scroll-y @scroll="onScroll" :scroll-top="scrollTop" :scrollIntoView="scrollIntoView"
                @touchmove.stop.prevent>
                <Month :color="color" :rowHeight="rowHeight" :showMark="showMark" :months="months" :modeType="modeType"
                    :show="show" :maxCount="maxCount" :defaultDate="defaultDate" :minDate="innerMinDate"
                    :maxDate="innerMaxDate" :maxMonth="monthNum" :readonly="readonly" :maxRange="maxRange"
                    :rangePrompt="rangePrompt" :showRangePrompt="showRangePrompt" :allowSameDay="allowSameDay"
                    ref="month" @monthSelected="monthSelected" @updateMonthTop="updateMonthTop"></Month>
            </scroll-view>

            <view class="k-calendar__btns">
                <kButtonGroup confirmText="确定" :cancelText="cancelText" @cancel="close" @confirm="confirm">
                </kButtonGroup>
            </view>
        </view>
    </kPopup>
</template>

<script>
import kButtonGroup from "../k-button-group/index.vue"
import kPopup from "../k-popup/index.vue"
import Header from './header.vue'
import Month from './month.vue'
import dayjs from 'dayjs'
export default {
    components: {
        Header,
        Month,
        kButtonGroup,
        kPopup
    },
    props: {
        // 是否显示日历弹窗
        show: {
            type: Boolean,
            default: false
        },
        // 左边取消按钮文字
        cancelText: {
            type: String,
            default: '取消'
        },
        // 圆角值
        round: {
            type: [Boolean, String, Number],
            default: 20
        },
        // 是否允许点击遮罩关闭日历
        closeOnClickOverlay: {
            type: Boolean,
            default: false
        },
        // 日历顶部标题
        title: {
            type: String,
            default: '选择日期'
        },
        // 是否显示标题
        showTitle: {
            type: Boolean,
            default: true
        },
        // 是否显示副标题
        showSubtitle: {
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
        // 日期行高
        rowHeight: {
            type: [String, Number],
            default: 50
        },
        // 是否显示月份背景色
        showMark: {
            type: Boolean,
            default: true
        },
        // 日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
        modeType: {
            type: String,
            default: 'single'
        },
        // modeType=multiple时，最多可选多少个日期
        maxCount: {
            type: [String, Number],
        },
        // 默认选中的日期，mode为multiple或range是必须为数组格式
        defaultDate: {
            type: [Array, String, Date, null],
            default: null
        },
        // 最多展示月份数量
        monthNum: {
            type: [Number, String],
            default: 10
        },
        // 是否为只读状态，只读状态下禁止选择日期
        readonly: {
            type: Boolean,
            default: false
        },
        // 日期区间最多可选天数，默认无限制，mode = range时有效
        maxRange: {
            type: [Number, String],
        },
        // 范围选择超过最多可选天数时的提示文案，mode = range时有效
        rangePrompt: {
            type: String,
            default: ''
        },
        // 范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效
        showRangePrompt: {
            type: Boolean,
            default: true
        },
        // 日期格式化函数
        formatter: {
            type: [Function, null],
            default: null
        },
        // 是否允许日期范围的起止时间为同一天，mode = range时有效
        allowSameDay: {
            type: Boolean,
            default: false
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
    },
    data() {
        return {
            // 需要显示的月份的数组
            months: [],
            // 在月份滚动区域中，当前视图中月份的index索引
            monthIndex: 0,
            // 月份滚动区域的高度
            listHeight: 0,
            // month组件中选择的日期数组
            selected: [],
            scrollIntoView: '',
            scrollTop: -1,
            // 过滤处理方法
            innerFormatter: (value) => value
        };
    },
    mounted() {
        this.start = Date.now()
        this.init()
    },
    methods: {
        closePopup() {
            this.$emit("update:show", false)
        },
        close() {
            this.$emit('close')
            this.$emit("update:show", false)
        },
        confirm() {
            this.$emit('confirm', this.selected)
            this.$emit("update:show", false)

        },
        // month组件内部选择日期后，通过事件通知给父组件
        monthSelected(e) {
            this.selected = e
            // 在不需要确认按钮的情况下，如果为单选，或者范围多选且已选长度大于2，则直接进行返还
            // if (
            //     this.modeType === 'multiple' ||
            //     this.modeType === 'single' ||
            //     (this.modeType === 'range' && this.selected.length >= 2)
            // ) {
            //     console.log('this.selected', this.selected);
            //     // this.$emit('confirm', this.selected)
            // }
        },
        // 更新月份的top值
        updateMonthTop(topArr = []) {
            // 设置对应月份的top值，用于onScroll方法更新月份
            topArr.map((item, index) => {
                this.months[index].top = item
            })
            // 获取默认日期的下标
            if (!this.defaultDate) {
                // 如果没有设置默认日期，则将当天日期设置为默认选中的日期
                const selected = dayjs().format("YYYY-MM")
                this.scrollIntoDefaultMonth(selected)
                return
            }
            let selected = dayjs().format("YYYY-MM");
            // 单选模式，可以是字符串或数组，Date对象等
            if (!Object.prototype.toString.call(this.defaultDate) === '[object Array]') {
                selected = dayjs(this.defaultDate).format("YYYY-MM")
            } else {
                selected = dayjs(this.defaultDate[0]).format("YYYY-MM");
            }
            this.scrollIntoDefaultMonth(selected)
        },
        /**
         * @description 日期的月或日补零操作
         * @param {String} value 需要补零的值
         */
        padZero(value) {
            return `00${value}`.slice(-2)
        },
        // 滚动到默认设置的月份
        scrollIntoDefaultMonth(selected) {
            console.log('selected', selected);
            // 查询默认日期在可选列表的下标
            const _index = this.months.findIndex(({
                year,
                month
            }) => {
                month = this.padZero(month)
                return `${year}-${month}` === selected
            })
            console.log('_index', _index);

            if (_index !== -1) {
                this.$nextTick(() => {
                    this.scrollIntoView = `month-${_index}`
                    console.log('scrollIntoView', this.scrollIntoView);
                })
                if (this.scrollTop == this.months[_index].top) {
                    this.scrollTop = this.months[_index].top - 1
                } else {
                    this.scrollTop = this.months[_index].top || 0;
                }
                console.log('this.scrollTop', this.scrollTop);
            }
        },
        init() {
            // 校验maxDate，不能小于当前时间
            // if (
            //     this.innerMaxDate &&
            //     new Date(this.innerMaxDate).getTime() <= Date.now()
            // ) {
            //     return console.log('maxDate不能小于当前时间')
            // }
            // 滚动区域的高度
            const { windowHeight } = uni.getSystemInfoSync()
            this.listHeight = windowHeight * 0.9 - 200// UI设计最大高度为屏幕0.9
            console.log(windowHeight, this.listHeight);
            this.setMonth()
        },
        range(min = 0, max = 0, value = 0) {
            return Math.max(min, Math.min(max, Number(value)))
        },
        // 设置月份数据
        setMonth() {
            // 最小日期的毫秒数
            const minDate = this.innerMinDate || dayjs().valueOf()

            // 如果没有指定最大日期，则往后推3个月
            const maxDate =
                this.innerMaxDate ||
                dayjs(minDate)
                    .add(this.monthNum - 1, 'month')
                    .valueOf()
            // 最大最小月份之间的共有多少个月份，
            const months = this.range(
                1,
                this.monthNum,
                this.getMonths(minDate, maxDate)
            )
            // 先清空数组
            this.months = []
            for (let i = 0; i < months; i++) {
                this.months.push({
                    date: new Array(
                        dayjs(minDate).add(i, 'month').daysInMonth()
                    )
                        .fill(1)
                        .map((item, index) => {
                            // 日期，取值1-31
                            let day = index + 1
                            // 星期，0-6，0为周日
                            const week = dayjs(minDate)
                                .add(i, 'month')
                                .date(day)
                                .day()
                            const date = dayjs(minDate)
                                .add(i, 'month')
                                .date(day)
                                .format('YYYY-MM-DD')
                            let bottomInfo = ''
                            if (this.showLunar) {
                                // 将日期转为农历格式
                                const lunar = Calendar.solar2lunar(
                                    dayjs(date).year(),
                                    dayjs(date).month() + 1,
                                    dayjs(date).date()
                                )
                                bottomInfo = lunar.IDayCn
                            }
                            let config = {
                                day,
                                week,
                                // 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
                                disabled:
                                    dayjs(date).isBefore(
                                        dayjs(minDate).format('YYYY-MM-DD')
                                    ) ||
                                    dayjs(date).isAfter(
                                        dayjs(maxDate).format('YYYY-MM-DD')
                                    ),
                                // 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
                                date: new Date(date),
                                bottomInfo,
                                dot: false,
                                month:
                                    dayjs(minDate).add(i, 'month').month() + 1
                            }
                            const formatter =
                                this.formatter || this.innerFormatter
                            return formatter(config)
                        }),
                    // 当前所属的月份
                    month: dayjs(minDate).add(i, 'month').month() + 1,
                    // 当前年份
                    year: dayjs(minDate).add(i, 'month').year()
                })
            }
        },
        // 获得两个日期之间的月份数
        getMonths(minDate, maxDate) {
            const minYear = dayjs(minDate).year()
            const minMonth = dayjs(minDate).month() + 1
            const maxYear = dayjs(maxDate).year()
            const maxMonth = dayjs(maxDate).month() + 1
            return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1
        },
        // scroll-view滚动监听
        onScroll(event) {
            // console.log('event', event);
            // 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
            const scrollTop = Math.max(0, event.detail.scrollTop)
            // console.log('scrollTop', scrollTop);
            // 将当前滚动条数值，除以滚动区域的高度，可以得出当前滚动到了哪一个月份的索引
            for (let i = 0; i < this.months.length; i++) {
                if (scrollTop >= (this.months[i].top || this.listHeight)) {
                    this.monthIndex = i
                }
            }
        },
    },
    computed: {
        subtitle() {
            // 初始化时，this.months为空数组，所以需要特别判断处理
            if (this.months.length) {
                // return `${this.months[this.monthIndex].year}年${this.months[this.monthIndex].month
                //     }月`
                return `${this.months[this.monthIndex].year}年`
            } else {
                return ''
            }
        },
        // 由于maxDate和minDate可以为字符串(2021-10-10)，或者数值(时间戳)，但是dayjs如果接受字符串形式的时间戳会有问题，这里进行处理
        innerMaxDate() {
            return this.maxDate
        },
        innerMinDate() {
            return this.minDate
        },

    }
}
</script>
<style scoped lang="scss">
.k-calendar {
    background-color: #fff;
    border-radius: 20rpx 20rpx 0px 0px;
    padding: 24rpx 24rpx;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 24rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + 24rpx);

    &__btns {
        margin-top: 50rpx;
    }

}
</style>