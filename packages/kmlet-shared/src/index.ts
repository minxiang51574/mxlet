/*
 * @Author: Mx
 * @Date: 2022-09-21 15:23:52
 * @Description: kmlet-shared 
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

export const createComponent = (name: string) => {
    const componentName = 'k-' + name;
    return componentName
}

export const pxSize = (value: number | string): string => {
    return isNaN(Number(value)) ? String(value) : `${value}px`;
}