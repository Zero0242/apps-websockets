import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
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

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const [from, to] = await Promise.all([
      this.usersService.findById(createMessageDto.from),
      this.usersService.findById(createMessageDto.to),
    ]);
    const message = this.messageRepository.create({
      from,
      message: createMessageDto.message,
      to,
    });

    return await this.messageRepository.save(message);
  }

  async getConnectedUsers(): Promise<User[]> {
    const query = this.usersRepository
      .createQueryBuilder()
      .addOrderBy('online', 'ASC');
    return query.getMany();
  }

  async connectUser(id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    return await this.usersRepository.save({ ...user, online: true });
  }

  async disconnectUser(id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    return await this.usersRepository.save({ ...user, online: false });
  }
}
