import type { ZoneType } from './configuration.model';

export interface LightGroup {
  id: string;
  name: string;
  lights: string[];
  sensors?: string[];
  type: ZoneType;
  state: GroupState;
  recycle: boolean;
  class: string;
  action: GroupAction;
}

export interface GroupState {
  all_on: boolean;
  any_on: boolean;
}

export interface GroupAction {
  on: boolean;
  bri: number;
  hue?: number;
  sat?: number;
  effect?: string;
  xy?: number[];
  ct?: number;
  alert?: string;
  colormode?: string;
}
