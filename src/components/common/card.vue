<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
});
</script>

<template>
  <div class="card">
    <h1 v-if="title" class="card-title">{{ title }}</h1>
    <h3 v-if="subtitle" class="card-subtitle">{{ subtitle }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>
@import './card.scss';
</style>
