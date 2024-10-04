import { Injectable } from '@nestjs/common';
import { Ticket } from './entity/ticket';

@Injectable()
export class TicketsService {
  private ultimoNumero: number = 0;
  private pendientes: Ticket[] = [];
  private asignados: Ticket[] = [];

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

  asignarTicket(agente: string, escritorio: number) {
    if (this.pendientes.length === 0) return null;

    const siguienteTicket = this.pendientes.shift();
    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    this.asignados.unshift(siguienteTicket);
    return siguienteTicket;
  }
}
