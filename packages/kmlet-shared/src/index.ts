/*
 * @Author: Mx
 * @Date: 2022-09-21 15:23:52
 * @Description: kmlet-shared 
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isObject = (val: unknown): val is Record<string, any> => typeof val === 'object' && val !== null

export const isArray = (val: unknown): val is Array<any> => Array.isArray(val)

export const createComponent = (name: string) => {
    const componentName = 'k-' + name;
    return componentName
}

export const pxSize = (value: number | string): string => {
    return isNaN(Number(value)) ? String(value) : `${value}px`;
}

export const sleep = (value: number = 30) => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve()
        }, value)
    })
}

export const throttle = (method: any, mustRunDelay = 200): (() => void) => {
    let timer: number
    let start = 0

    return function loop(this: unknown, ...args) {
        const now = Date.now()
        const elapsed = now - start

        if (!start) {
            start = now
        }

        if (timer) {
            window.clearTimeout(timer)
        }

        if (elapsed >= mustRunDelay) {
            method.apply(this, args)
            start = now
        } else {
            timer = window.setTimeout(() => {
                loop.apply(this, args)
            }, mustRunDelay - elapsed)
        }
    }
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
export const timeFormat = (dateTime = null, formatStr = 'yyyy-mm-dd') => {
    let date
    // 若传入时间为假值，则取当前时间
    if (!dateTime) {
        date = new Date()
    }
    // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
    else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
        date = new Date(dateTime * 1000)
    }
    // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
    else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
        date = new Date(Number(dateTime))
    }
    // 其他都认为符合 RFC 2822 规范
    else {
        // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
        date = new Date(
            typeof dateTime === 'string'
                ? dateTime.replace(/-/g, '/')
                : dateTime
        )
    }

    const timeSource = {
        'y': date.getFullYear().toString(), // 年
        'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
        'd': date.getDate().toString().padStart(2, '0'), // 日
        'h': date.getHours().toString().padStart(2, '0'), // 时
        'M': date.getMinutes().toString().padStart(2, '0'), // 分
        's': date.getSeconds().toString().padStart(2, '0') // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }

    for (const key in timeSource) {
        const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
        if (ret) {
            // 年可能只需展示两位
            const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
            formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
        }
    }

    return formatStr
}