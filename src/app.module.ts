import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './controllers/messages/messages.controller';
import {TypeOrmModule } from '@nestjs/typeorm';
import { MessageDataTable } from './data-access/message-data-table.entity';
import { MessageService } from './services/message/message.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nest',
    password: 'app',
    database: 'sendmeapp_db',
    entities: [MessageDataTable],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([MessageDataTable]),
],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessageService],
})
export class AppModule {}
