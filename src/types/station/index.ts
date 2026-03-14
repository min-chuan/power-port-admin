export interface ChargingStationItem {
  name: string;
  id: string;
  city: string;
  fast?: number;
  slow?: number;
  status: number;
  now?: number;
  fault?: number;
  person: string;
  tel: string;
}
