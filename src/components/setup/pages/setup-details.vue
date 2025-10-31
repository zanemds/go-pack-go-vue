<script lang="ts">
import { useSubscription } from '@vueuse/rxjs';
import Card from '../../common/card.vue';
import { ConfiguratorService, gpgRoute } from '@zanemds/dal';
import { ZoneType, LightGroup } from '@zanemds/dal';
import { useRouter } from 'vue-router';

export default {
  components: { Card },
  data() {
    return {
      //declare variables here
      selected: null as LightGroup | null,
      zone: '',
      zoneType: '',
      configurator: new ConfiguratorService(),
      groups: [] as LightGroup[],
      router: useRouter(),
      token: '',
    };
  },
  methods: {
    clickHandler() {
      if (!this.selected) {
        return;
      }

      this.configurator.setConfigs(
        this.selected.name ?? '',
        this.selected.type ?? '',
        this.token
      );

      this.router.push(gpgRoute.home);
    },
  },
  mounted() {
    this.configurator.getConfiguredIP$().then((ip) => {
      this.zone = this.configurator.getConfigurations().areaName;
      this.zoneType = this.configurator.getConfigurations().zoneType;
      this.token = this.configurator.getToken();
      if (this.zone?.length > 0 && this.zoneType?.length > 0) {
        console.log('zone:', this.zone, 'zoneType:', this.zoneType);
        this.router.push(gpgRoute.home);
      }
      this.configurator.getGroups().then((response) => {
        const roomGroups = (Object.values(response.data) as LightGroup[])
          .filter((data) => !(data.name as String).includes('$lights'))
          .filter(
            (data) => data.type !== ZoneType.ENTERTAINMENT
          ) as LightGroup[];
        const entertainmentGroups = (
          Object.values(response.data) as LightGroup[]
        )
          .filter((data) => data.name.includes('$lights'))
          .filter((data) => data.type === ZoneType.ENTERTAINMENT)
          .filter(
            (data) =>
              !roomGroups.some((roomGroup) => roomGroup.name === data.name)
          ) as LightGroup[];
        this.groups = [...roomGroups, ...entertainmentGroups];
        console.log('groups', this.groups);
      });
    });
  },
};
</script>

<template>
  <Card title="Details" subtitle="Which group of lights should we control?">
    <div>
      <select v-model="selected">
        <option v-for="group in groups" :key="group.id" :value="group">
          {{ group.name }}
        </option>
      </select>
    </div>
    <div>
      <button @click="clickHandler()" :disabled="!selected">Finished</button>
    </div>
  </Card>
</template>

<style scoped>
@import '@zanemds/styles/global.scss';
@import '@zanemds/styles/theme.scss';
</style>
