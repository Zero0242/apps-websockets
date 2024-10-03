import { v4 as uuid } from 'uuid';
export class Marker {
  public id: string;
  constructor(
    public lat: number,
    public lng: number,
  ) {
    this.id = uuid();
    this.lat = lat;
    this.lng = lng;
  }
}
