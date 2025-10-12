<script lang="ts">

export default {
    data() {
        return {
            counter: 0
        };
    },
    methods: {
        clickHandler() {
            console.log("Button clicked from setup-guide.vue", this.counter);
            this.counter++;
        }
    }
};
</script>

<template>
  <h1 class="page-header">Setup</h1>
  <div>
    Welcome to the setup guide! Let's get you started.
  </div>
  <button solid @click="clickHandler">Get Started</button>
</template>

<style scoped>
@import '@zanemds/styles/global.scss';
</style>
