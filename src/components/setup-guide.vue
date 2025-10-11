<script>
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
  <div>Hello</div>
  <button @click="clickHandler">Hello Button</button>
</template>

<style scoped></style>
