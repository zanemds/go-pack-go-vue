<script lang="ts">
import Card from '../../common/card.vue';
import { ConfiguratorService, setupRoutes } from '@zanemds/dal';
import bridgeIcon from '@zanemds/assets/icons/bridge.svg';
import { useSubscription, useSubject } from '@vueuse/rxjs';
import { BehaviorSubject, filter, interval } from 'rxjs';

export default {
  components: { Card },
  data() {
    return {
      bridgeIcon,
      counter: 30,
      bridgeIP: '',
      authorized: false,
      counter$: new BehaviorSubject<number>(30),
    };
  },
  methods: {
    clickHandler() {
      this.$router.push(setupRoutes.DETAILS);
    },
  },
  mounted() {
    const configurator = new ConfiguratorService();
    configurator.getConfiguredIP$().then((ip) => {
      this.bridgeIP = ip;
      useSubscription(
        interval(1000)
          .pipe(filter((int) => this.counter > 0))
          .subscribe((value) => {
            this.counter -= 1;
            this.counter$.next(this.counter);
          })
      );
      useSubscription(
        this.counter$
          .asObservable()
          .pipe(filter((count) => count === 0))
          .subscribe((value) => {
            console.log('attempting to authorize bridge');
            configurator.authorizeBridge().then((response) => {
              const resStatus = Object.keys(response.data[0])[0];
              switch (resStatus) {
                case 'success':
                  console.log('success authorizing bridge');
                  this.authorized = true;
                  this.$router.push(setupRoutes.DETAILS);
                  break;
                case 'error':
                  console.log('error authorizing bridge, resetting counter');
                  this.counter = 30;
                  this.counter$.next(this.counter);
                  break;
              }
            });
          })
      );
    });
  },
};
</script>

<template>
  <Card title="Setup Bridge">
    <div subtitle>
      Find your bridge and press the Authorization button found on the bridge
    </div>
    <div v-if="bridgeIP">
      <div>Attempting to authorize bridge at {{ bridgeIP }} ...</div>
      <div>Checking in {{ counter }} seconds</div>
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
@import '@zanemds/styles/global.scss';
@import '@zanemds/styles/theme.scss';

[icon] {
  height: 200px;
  width: 200px;
}

[subtitle] {
  font-size: 1.2em;
  margin-bottom: 15px;
}

.bridge-icon {
  z-index: 0;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.1;
    left: 30%;
  }
  50% {
    opacity: 1;
    left: calc(45% - 60px);
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
