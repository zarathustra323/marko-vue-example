<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="my-cool-carousel__image-wrapper">
    <img
      :src="src"
      :alt="alt"
    >
    <p v-if="caption" v-html="caption" />
    <small v-if="credit" v-html="credit" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: null,
    },
    caption: {
      type: String,
      default: null,
    },
    credit: {
      type: String,
      default: null,
    },
  },
};
</script>
