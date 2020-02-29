import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDataTable } from 'src/data-access/message-data-table.entity';
import { Message } from 'src/models/message';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(MessageDataTable)
        private readonly messagesDataTableRepository: Repository<MessageDataTable>,
      ) {}

      async getAll():Promise<Message[]> {
        return await this.messagesDataTableRepository.find();
      }
    
      async getOne(id: string):Promise<Message> {
        return await this.messagesDataTableRepository.findOne(id);
      }

      async createMessage(newMessage: Message):Promise<Message>{
        const newMess = new Message();
        newMess.nick =newMessage.nick;
        newMess.message =newMessage.message;

        return await this.messagesDataTableRepository.save(newMess);
      }

      async updateMessage(idMessage:number, messageToUpdate: Message): Promise<Message>{
        const messageToU = await this.messagesDataTableRepository.findOne(idMessage);
        messageToU.nick =messageToUpdate.nick;
        messageToU.message =messageToUpdate.message;

        return await this.messagesDataTableRepository.save(messageToU);
      }

      async deleteMessage(idMessage:number): Promise<any>{        
        return await this.messagesDataTableRepository.delete(idMessage);
      }
}
