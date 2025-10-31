import type { Configuration, ZoneType } from '../models/configuration.model';
import { useRouter } from 'vue-router';
import { gpgRoute, setupRoutes } from '../models/route.model';
import axios from 'axios';
import { storeKeyNames } from '../models/storage.model';
export class ConfiguratorService {
  private router = useRouter();

  //TODO decide where this comes from dynamically
  private config: Configuration;

  constructor() {
    const zoneName: string = localStorage.getItem(
      storeKeyNames.zoneName
    ) as string;
    const zoneType: ZoneType = localStorage.getItem(
      storeKeyNames.zoneType
    ) as ZoneType;
    const token: string = localStorage.getItem(storeKeyNames.token) as string;
    const IP: string = localStorage.getItem(storeKeyNames.IP) as string;
    const deviceType: string = localStorage.getItem(
      storeKeyNames.deviceType
    ) as string;
    [zoneName, zoneType, token, IP, deviceType].some((item) => !item)
      ? null
      : (this.config = {
          areaName: zoneName,
          zoneType: zoneType,
          deviceType: deviceType,
          IP: IP,
          token: token,
        });
  }

  public checkConfiguration(): void {
    const zoneName: string = localStorage.getItem(
      storeKeyNames.zoneName
    ) as string;
    const zoneType: ZoneType = localStorage.getItem(
      storeKeyNames.zoneType
    ) as ZoneType;
    const token: string = localStorage.getItem(storeKeyNames.token) as string;
    const IP: string = localStorage.getItem(storeKeyNames.IP) as string;
    const deviceType: string = localStorage.getItem(
      storeKeyNames.deviceType
    ) as string;
    [zoneName, zoneType, token, IP, deviceType].some((item) => !item)
      ? null
      : (this.config = {
          areaName: zoneName,
          zoneType: zoneType,
          deviceType: deviceType,
          IP: IP,
          token: token,
        });

    if (!this.config) {
      this.navigateToSetup();
      return;
    }

    axios.get('/src/assets/configurations/ui-context.json').then((response) => {
      axios
        .get(`http://${this.config.IP}/api/${this.config.token}/lights`)
        .then((response) => {
          response.data[0]?.error ? this.navigateToSetup() : null;
        })
        .catch((error) => {
          this.navigateToSetup();
        });
    });
  }

  private navigateToSetup() {
    this.router.push({ path: gpgRoute.setup + '/' + setupRoutes.WELCOME });
  }

  public discoverBridge(): Promise<any> {
    return axios.get('https://discovery.meethue.com/', {
      withCredentials: false,
    });
  }

  public getGroups(): Promise<any> {
    return axios.get(
      `http://${this.config.IP}/api/${this.config.token}/groups`
    );
  }

  public getConfiguredIP(): string {
    return this.config.IP;
  }

  /**
   * To grab ip configs asynchronously from the json file
   *
   * @returns
   */
  public getConfiguredIP$(): Promise<string> {
    return axios
      .get('/src/assets/configurations/ui-context.json')
      .then((response) => {
        this.config = response.data.bridgeConfigs as Configuration;
        return this.config.IP;
      });
  }

  public getToken(): string {
    return this.config.token;
  }

  public getConfigurations(): Configuration {
    return this.config;
  }

  public authorizeBridge(): Promise<any> {
    return axios.post(`http://${this.config.IP}/api`, {
      devicetype: this.config.deviceType,
    });
  }

  public countdown(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  public setConfigs(zoneName: string, zoneType: string, token: string) {
    localStorage.setItem(storeKeyNames.zoneName, zoneName);
    localStorage.setItem(storeKeyNames.zoneType, zoneType);
    localStorage.setItem(storeKeyNames.token, token);
    localStorage.setItem(storeKeyNames.IP, this.config.IP);
    localStorage.setItem(storeKeyNames.deviceType, this.config.deviceType);
  }
}
