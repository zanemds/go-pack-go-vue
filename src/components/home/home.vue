<script lang="ts">
import HomeContent from './home-content.vue';
import { ConfiguratorService } from '@zanemds/dal';
export default {
    components: {
        HomeContent
    },
    setup() {
      const configurator = new ConfiguratorService();

    }
};






</script>

<template>
  <div>Hello, this is the home page</div>
  <HomeContent msg="This is a message"/>
</template>

<style scoped></style>
