<template>
  <div class="my-cool-carousel">
    <h3>Vue component: My cool carousel</h3>
    <ul>
      <li
        v-for="image in images"
        :key="image.id"
      >
        {{ image.src }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
