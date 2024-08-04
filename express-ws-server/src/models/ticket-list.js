import { Ticket } from "./ticket";

export class TicketList {
  constructor() {
    this.ultimoNumero = 0;
    /** @type {Ticket[]} */
    this.pendientes = [];
    /** @type {Ticket[]} */
    this.asignados = [];
  }

  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }

  get ultimos13() {
    return this.asignados.slice(0, 13);
  }

  crearTicket() {
    const nuevoTicket = new Ticket(this.siguienteNumero);
    this.pendientes.push(nuevoTicket);
    return nuevoTicket;
  }

  asignarTicket(agente, escritorio) {
    if (this.pendientes.length === 0) return null;

    const siguienteTicket = this.pendientes.shift();
    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    this.asignados.unshift(siguienteTicket);
    return siguienteTicket;
  }
}
