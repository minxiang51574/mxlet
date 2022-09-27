<!--
 * @Author       : Mx
 * @Date         : 2022-08-20 19:43:20
 * @Description  : Empty 空状态
-->
<template>
    <view class="k-empty">
        <!-- 占位图 -->
        <view class="k-empty-image" :style="imgStyle">
            <template v-if="$slots.image">
            </template>
            <template v-else>
                <img v-if="imageUrl" class="img" :src="imageUrl" />
            </template>
        </view>

        <!-- 文本区 -->
        <template v-if="$slots.description">
            <slot name="description"></slot>
        </template>
        <template v-else>
            <view class="k-empty-description">{{ description || '暂无数据～' }}</view>
        </template>

        <!-- 自定义slot -->
        <template v-if="$slots.default">
            <slot></slot>
        </template>
    </view>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
const props = defineProps({
    image: {
        type: String,
        default: 'empty' //默认empty
    },
    imageSize: {
        type: [Number, String], // 图片大小，正方形
        default: ''
    },
    description: {
        type: String, // 文字区
        default: ''
    },
    imageUrl: {
        type: String,
        // #ifdef MP-WEIXIN
        default: 'http://file-sso.oss-cn-hangzhou.aliyuncs.com/qiwei/img-empty-orange.png',
        // #endif

        // #ifdef H5
        default: 'http://file-sso.oss-cn-hangzhou.aliyuncs.com/qiwei/img-empty-blue.png'
        // #endif
    }
})

/**
   * 根据imgSize计算行内样式
   */
const { image, imageSize } = toRefs(props);

const imgStyle = computed(() => {
    if (!imageSize.value) {
        return '';
    }
    if (typeof imageSize.value === 'number') {
        return `width:${imageSize.value}px;height:${imageSize.value}px`;
    }
    return `width:${imageSize.value};height:${imageSize.value}`;
});

</script>
<style lang='scss' scoped>
.k-empty {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: $empty-padding;

    &-image {
        width: $empty-image-size;
        height: $empty-image-size;

        .img {
            width: 100%;
            height: 100%;
        }

        // 兼容小程序标签和img-slot
        img,
        image {
            width: 100%;
            height: 100%;
        }
    }

    &-description {
        margin-top: $empty-description-margin-top;
        padding: $empty-description-padding;
        color: $empty-description-color;
        font-size: $empty-description-font-size;
        line-height: $empty-description-line-height;
    }
}
</style>
