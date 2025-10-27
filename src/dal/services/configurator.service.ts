import type { Configuration } from '../models/configuration.model';
import { useRouter } from 'vue-router';
import { gpgRoute, setupRoutes } from '../models/route.model';
import axios from 'axios';
export class ConfiguratorService {
  private router = useRouter();

  private config: Configuration = JSON.parse(
    localStorage.getItem('gpgConfig')
  ) as Configuration;

  constructor() {
    // axios.get('/src/assets/configurations/ui-context.json').then((response) => {
    //   this.config = response.data.bridgeConfigs as Configuration;
    // });
  }

  public checkConfiguration(): void {
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
}
