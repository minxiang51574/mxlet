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