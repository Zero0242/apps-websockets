import { v4 as uuid } from "uuid";

export class Ticket {
  constructor(numero) {
    this.id = uuid();
    this.numero = Number(numero);
    this.agente = null;
    this.escritorio = null;
  }
}
