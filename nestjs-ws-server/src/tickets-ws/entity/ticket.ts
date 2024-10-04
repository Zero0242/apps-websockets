import { v4 as uuid } from 'uuid';
export class Ticket {
  public readonly id: string;
  public agente: string | null;
  public escritorio: number | null;
  constructor(public numero: number) {
    this.id = uuid();
    this.agente = null;
    this.escritorio = null;
  }
}
