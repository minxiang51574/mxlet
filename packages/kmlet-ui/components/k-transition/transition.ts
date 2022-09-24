/*
 * @Author       : Mx
 * @Date         : 2022-08-11 16:33:54
 * @Description  : 
 */

// nvue动画模块实现细节抽离在外部文件
import animationMap from './ani-map'

// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
export const getClassNames = (name: string) => ({
    enter: `k-${name}-enter k-${name}-enter-active`,
    'enter-to': `k-${name}-enter-to k-${name}-enter-active`,
    leave: `k-${name}-leave k-${name}-leave-active`,
    'leave-to': `k-${name}-leave-to k-${name}-leave-active`
})

export const getStyle = (name: string) => animationMap[name]
