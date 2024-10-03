import { Injectable } from '@nestjs/common';
import { CreateMarkerDto, UpdateMarkerDto } from './dto';
import { Marker } from './entities/marker.entity';

@Injectable()
export class MarkersService {
  private marcadores: Record<string, Marker> = {};

  findAll() {
    return this.marcadores;
  }

  create({ lat, lng }: CreateMarkerDto) {
    const marker = new Marker(lat, lng);
    this.marcadores[marker.id] = marker;

    return marker;
  }

  update(updateMarkerDto: UpdateMarkerDto) {
    const marker: Marker = updateMarkerDto;

    this.marcadores[marker.id] = marker;

    return marker;
  }
}
