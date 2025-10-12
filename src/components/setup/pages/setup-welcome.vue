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
      this.$router.push(setupRoutes.BRIDGE);
    },
  },
};
</script>

<template>
  <Card title="Setup">
    <div>Welcome to the setup guide! Let's get you started.</div>
    <div class="footer">
      <button @click="clickHandler">Get Started</button>
    </div>
  </Card>
</template>

<style scoped>
@import "@zanemds/styles/global.scss";

.footer {
  margin-top: 20px;
}
</style>
