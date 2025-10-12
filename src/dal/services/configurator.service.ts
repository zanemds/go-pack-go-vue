import type { Configuration } from "../models/configuration.model";
import { useRouter } from "vue-router";
import { gpgRoute } from "../models/route.model";
export class ConfiguratorService {
  static config: Configuration = JSON.parse(localStorage.getItem("gpgConfig")) as Configuration;

  constructor() {
    
    if (!this.config?.IP) {
      console.log("No IP configured, redirecting to setup");
      useRouter().push(gpgRoute.setup);
    }
  }
}
