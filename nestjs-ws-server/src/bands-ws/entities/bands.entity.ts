import { v4 as uuid } from 'uuid';
export class Band {
  public id: string;
  public votes: number;
  constructor(public name: string) {
    this.id = uuid();
    this.name = name;
    this.votes = 0;
  }
}
