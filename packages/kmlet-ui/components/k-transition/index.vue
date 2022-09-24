<!--
 * @Author       : Mx
 * @Date         : 2022-09-24
 * @Description  : transition
-->
<template>
    <view :class="classes" :style="styles" @tap="clickHandler" @touchmove.stop.prevent="preventEvent" class="k-transition"
      ref="transition" v-if="inited">
      <slot />
    </view>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { getClassNames, getStyle } from './transition'
import { sleep } from "@kmlet/shared" 
import { transitionProps} from "./props"

const props = defineProps(transitionProps)

const inited = ref(false) // 是否显示/隐藏组件
const viewStyle = ref({}) // 组件内部的样式
const status = ref('') // 记录组件动画的状态
const transitionEnded = ref(false) // 组件是否结束的标记
const display = ref(false) // 组件是否展示
const classes = ref('') // 应用的类名
const transition = ref(null)

const emit = defineEmits([
  'beforeEnter',
  'enter',
  'afterEnter',
  'click',
  'beforeLeave',
  'leave',
  'afterLeave'
])  
const { duration, timingFunction, customStyle } = props

const styles = computed(() => {
  return {
    // #ifndef APP-NVUE
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
    // #endif
    ...customStyle
  }
})


// #ifndef APP-NVUE
// vue版本的组件进场处理
const vueEnter = () => {
  // 动画进入时的类名
  const classNames = getClassNames(props.mode)
  // 定义状态和发出动画进入前事件
  status.value = 'enter'
  emit('beforeEnter')
  inited.value = true
  display.value = true
  classes.value = classNames.enter
  nextTick(async () => {
    // #ifdef H5
    await sleep(20)
    // #endif
    // 标识动画尚未结束
    emit('enter')
    transitionEnded.value = false
    // 组件动画进入后触发的事件
    emit('afterEnter')
    // 赋予组件enter-to类名
    classes.value = classNames['enter-to']
  })
}
// 动画离场处理
const vueLeave = () => {
  // 如果不是展示状态，无需执行逻辑
  if (!display.value) return
  const classNames = getClassNames(props.mode)
  // 标记离开状态和发出事件
  status.value = 'leave'
  emit('beforeLeave')
  // 获得类名
  classes.value = classNames.leave

  nextTick(() => {
    // 动画正在离场的状态
    transitionEnded.value = false
    emit('leave')
    // 组件执行动画，到了执行的执行时间后，执行一些额外处理
    setTimeout(onTransitionEnd, props.duration)
    classes.value = classNames['leave-to']
  })
}
// #endif

const nextTick2 = () => new Promise(resolve => setTimeout(resolve, 1000 / 50))
// #ifdef APP-NVUE
// 引入nvue(weex)的animation动画模块，文档见：
// https://weex.apache.org/zh/docs/modules/animation.html#transition
const animation = uni.requireNativePlugin('animation')
// nvue版本动画进场
const nvueEnter = () => {
  // 获得样式的名称
  const currentStyle = getStyle(props.mode)
  // 组件动画状态和发出事件
  status.value = 'enter'
  emit('beforeEnter')
  // 展示生成组件元素
  inited.value = true
  display.value = true
  // 在nvue安卓上，由于渲染速度慢，在弹窗，键盘，日历等组件中，渲染其中的内容需要时间
  // 导致出现弹窗卡顿，这里让其一开始为透明状态，等一定时间渲染完成后，再让其隐藏起来，再让其按正常逻辑出现
  viewStyle.value = {
    opacity: 0
  }
  // 等待弹窗内容渲染完成
  nextTick(() => {
    // 合并样式
    viewStyle.value = currentStyle.enter
    Promise.resolve()
      .then(nextTick2)
      .then(() => {
        // 组件开始进入前的事件
        emit('enter')
        // nvue的transition动画模块需要通过ref调用组件，注意此处的ref不同于vue的this.$refs['k-transition']用法
        animation.transition(
          transition,
          {
            styles: currentStyle['enter-to'],
            duration: props.duration,
            timingFunction: props.timingFunction,
            needLayout: false,
            delay: 0
          },
          () => {
            // 动画执行完毕，发出事件
            emit('afterEnter')
          }
        )
      })
      .catch(() => { })
  })
}
const nvueLeave = () => {
  if (!display.value) {
    return
  }
  const currentStyle = getStyle(props.mode)
  // 定义状态和事件
  status.value = 'leave'
  emit('beforeLeave')
  // 合并样式
  viewStyle.value = currentStyle.leave
  // 放到promise中处理执行过程
  Promise.resolve()
    .then(nextTick2) // 等待几十ms
    .then(() => {
      transitionEnded.value = false
      // 动画正在离场的状态
      emit('leave')
      animation.transition(
        transition,
        {
          styles: currentStyle['leave-to'],
          duration: props.duration,
          timingFunction: props.timingFunction,
          needLayout: false,
          delay: 0
        },
        () => {
          onTransitionEnd()
        }
      )
    })
    .catch(() => { })
}
// #endif

// 完成过渡后触发
const onTransitionEnd = () => {
  // 如果已经是结束的状态，无需再处理
  if (transitionEnded.value) return
  transitionEnded.value = true
  // 发出组件动画执行后的事件
  emit(status.value === 'leave' ? 'afterLeave' : 'afterEnter')
  if (!props.show && display.value) {
    display.value = false
    inited.value = false
  }
}

// 阻止事件冒泡
const preventEvent = (e: TouchEvent) => {
  e && typeof (e.stopPropagation) === 'function' && e.stopPropagation()
}

const clickHandler = () => {
  emit('click')
}

watch(
  () => props.show,
  newVal => {
    // vue和nvue分别执行不同的方法
    // #ifdef APP-NVUE
    newVal ? nvueEnter() : nvueLeave()
    // #endif
    // #ifndef APP-NVUE
    newVal ? vueEnter() : vueLeave()
    // #endif
  },
  { immediate: true }
)
</script>
<style lang='scss' scoped>
@import "./transition.scss"
</style>
