<script setup lang="ts"></script>

<template>
  <div class="workspace">
    <div class="content"><router-view /></div>
  </div>
</template>

<style scoped>
@import '@zanemds/styles/global.scss';

.workspace {
  position: absolute;
  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
}

.content {
  padding: 20px;
}
</style>
