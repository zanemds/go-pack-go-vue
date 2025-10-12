export interface Configuration {
    IP: string;
    zoneType: ZoneType;
    areaName: string;
}

export enum ZoneType {
    ENTERTAINMENT = 'entertainment',
    ROOM = 'room',
}