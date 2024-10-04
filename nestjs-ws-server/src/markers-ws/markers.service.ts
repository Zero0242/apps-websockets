import { Injectable } from '@nestjs/common';
import { CreateMarkerDto, UpdateMarkerDto } from './dto';
import { Marker } from './entities/marker.entity';

@Injectable()
export class MarkersService {
  private marcadores: Record<string, Marker> = {};

  findAll() {
    return this.marcadores;
  }

  create({ lat, lng, id }: CreateMarkerDto) {
    const marker = new Marker(id, lat, lng);
    this.marcadores[marker.id] = marker;

    return marker;
  }

  update(marker: UpdateMarkerDto) {
    this.marcadores[marker.id] = marker;
  }
}
