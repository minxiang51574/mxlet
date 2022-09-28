<!--
 * @Author       : Mx
 * @Date         : 2022-08-18 16:00:13
 * @Description  : RadioGroup 单选框组
-->
<template>
    <radio-group :name="name">
        <slot></slot>
    </radio-group>
</template>

<script>
export default {
    name: "k-radio-group",
    props: {
        name: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [Number, String],
            default: ''
        },

    },
    data() {
        return {
            val: ''
        }
    },
    watch: {
        modelValue(val) {
            console.log('value: ' + val);
            // this.modelChange(val)
        },

    },
    created() {
        this.childrens = []
    },
    methods: {
        radioChange(e) {
            // this.$emit('change', e)
            // // TODO vue2 兼容
            // this.$emit('input', e.detail.value)
            // TODO vue3 兼容
            // #ifdef VUE3
            // this.$emit("update:modelValue", e.detail.value);
            // #endif
        },
        changeValue(value, target) {
            // console.log('changeValue');

            // this.val = value;
            // this.childrens.forEach(item => {
            //     if (item !== target) {
            //         item.val = false;
            //     }
            // })
            // let e = {
            //     detail: {
            //         value: value
            //     }
            // }
            // this.radioChange(e)
        },
        modelChange(val) {
            console.log('modelChange', val);

            // this.childrens.forEach(item => {
            //     if (item.value === val) {
            //         item.val = true;
            //     } else {
            //         item.val = false;
            //     }
            // })
        }
    }
}
</script>
<style scoped>

</style>
