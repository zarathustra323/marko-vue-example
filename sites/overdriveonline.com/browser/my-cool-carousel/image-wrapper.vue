<template>
  <!-- eslint-disable vue/no-v-html -->
  <div :class="`${blockName}__image-wrapper`">
    <img
      :src="src"
      :alt="alt"
      :class="`${blockName}__image`"
    >
    <p
      v-if="caption"
      :class="`${blockName}__caption`"
      v-html="caption"
    />
    <small
      v-if="credit"
      :class="`${blockName}__credit`"
      v-html="credit"
    />
  </div>
</template>

<script>
export default {
  props: {
    blockName: {
      type: String,
      required: true,
    },
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
