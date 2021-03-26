<template>
  <div :class="blockName">
    <h3>Vue component: My cool carousel</h3>
    <image-wrapper
      v-for="image in images"
      :key="image.id"
      :src="image.src"
      :alt="image.alt"
      :caption="image.caption"
      :credit="image.credit"
      :block-name="blockName"
    />
  </div>
</template>

<script>
// once inside the container component, sub-components can be directly imported
import ImageWrapper from './my-cool-carousel/image-wrapper.vue';

export default {
  components: { ImageWrapper },

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    blockName: 'my-cool-carousel',
  }),
};
</script>
