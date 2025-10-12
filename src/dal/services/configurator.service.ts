import type { Configuration } from "../models/configuration.model";
import { useRouter } from "vue-router";
import { gpgRoute, setupRoutes } from "../models/route.model";
export class ConfiguratorService {
  static config: Configuration = JSON.parse(localStorage.getItem("gpgConfig")) as Configuration;

  constructor() {
    
  }

  public checkConfiguration(): boolean {
    if (!ConfiguratorService.config || !ConfiguratorService.config.IP) {
      const router = useRouter();
      router.push(`${gpgRoute.setup}${setupRoutes.WELCOME}`);
      return false;
    }
    return true
  }
}
