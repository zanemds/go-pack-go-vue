<script lang="ts">
import Card from "../../common/card.vue";
import { setupRoutes } from "@zanemds/dal";

export default {
  components: { Card },
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    clickHandler() {
      this.$router.push(setupRoutes.DETAILS);
    },
  },
};
</script>

<template>
  <Card title="Setup Bridge">
    <div>Find your bridge and press the Authorization button found on the bridge</div>
    <div class="footer">
      <button @click="clickHandler">Next</button>
    </div>
  </Card>
</template>

<style scoped>
@import "@zanemds/styles/global.scss";
</style>
