import { Injectable } from '@nestjs/common';
import { UpdateBandsDTO } from './dto';
import { Band } from './entities/bands.entity';

@Injectable()
export class BandsWsService {
  private bandas: Band[] = [
    new Band('Metallica'),
    new Band('Bon Jovi'),
    new Band('The Beatles'),
    new Band('Red Hot Chilli Peppers'),
  ];

  create(nombre: string): Band {
    const banda = new Band(nombre);
    this.bandas.push(banda);
    return banda;
  }

  findAll(): Band[] {
    return this.bandas;
  }

  increaseVotes(id: string) {
    this.bandas = this.bandas.map((e) => {
      if (e.id !== id) return e;

      return { ...e, votes: e.votes + 1 };
    });
  }

  changeBandName({ id, name }: UpdateBandsDTO) {
    this.bandas = this.bandas.map((band) => {
      if (band.id === id) band.name = name;
      return band;
    });
  }

  remove(id: string) {
    this.bandas = this.bandas.filter((e) => e.id !== id);
  }
}
