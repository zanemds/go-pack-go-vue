export interface Configuration {
  IP: string;
  zoneType: ZoneType;
  areaName: string;
  token: string;
  deviceType: string;
}

export enum ZoneType {
  ENTERTAINMENT = 'entertainment',
  ROOM = 'room',
}
