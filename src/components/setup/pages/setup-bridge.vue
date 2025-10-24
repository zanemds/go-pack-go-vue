<script lang="ts">
import Card from "../../common/card.vue";
import { ConfiguratorService, setupRoutes } from "@zanemds/dal";
import bridgeIcon from "@zanemds/assets/icons/bridge.svg";
import axios from "axios";

export default {
  components: { Card },
  data() {
    return {
      bridgeIcon,
      counter: 0,
    };
  },
  methods: {
    clickHandler() {
      this.$router.push(setupRoutes.DETAILS);
    },
  },
  mounted(){
    axios.get('http://localhost:8080/hello').then((response) => {
      console.log('Discovered bridges:', response.data);
    }).catch((error) => {
      console.error('Error discovering bridges:', error);
    });
    // const configurator = new ConfiguratorService();
    // configurator.discoverBridge().then((bridges) => {
    //   console.log('Discovered bridges:', bridges);
    // }).catch((error) => {
    //   console.error('Error discovering bridges:', error);
    // });
  }
};
</script>

<template>
  <Card title="Setup Bridge">
    <div>
      Find your bridge and press the Authorization button found on the bridge
    </div>
    <div class="demonstration-container" primary-color>
      <font-awesome-icon
        icon="fa-solid fa-hand-point-right"
        size="3x"
        class="pointer-icon"
        primary-color
      />
      <img icon :src="bridgeIcon" class="bridge-icon" />
    </div>

    <div class="footer">
      <!-- <button @click="clickHandler">Next</button> -->
    </div>
  </Card>
</template>

<style scoped>
@import "@zanemds/styles/global.scss";
@import "@zanemds/styles/theme.scss";

[icon] {
  height: 200px;
  width: 200px;
}

.bridge-icon {
  z-index: 0;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.1;
    left: 40%;
    
  }
  50% {
    opacity: 1;
    left: calc(50% - 60px);
    
  }

}

.demonstration-container {
  /* max-width: 300px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  .pointer-icon {
    position: absolute;
    z-index: 1;
    animation: fadeInOut 4s infinite;
  }
}
</style>
