import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getMessages(uid: string, fromId: string): Promise<Message[]> {
    const query = this.messageRepository
      .createQueryBuilder()
      .where(` "fromId" = :fromId `, { fromId })
      .orWhere(` "fromId" = :fromId `, { toId: uid })
      .orWhere(` "toId" = :toId `, { toId: uid })
      .orWhere(` "toId" = :toId `, { toId: fromId })
      .addOrderBy(' created_at ', 'DESC')
      .limit(30);
    return await query.getMany();
  }
}
