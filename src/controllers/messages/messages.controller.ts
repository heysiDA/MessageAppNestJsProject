import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import {Message} from "src/models/message";
import { MessageService } from 'src/services/message/message.service';

@Controller('messages')
export class MessagesController {
    
    constructor(private messageService : MessageService){

    }    

    @Get()
    getAll(@Res() response){
        this.messageService.getAll().then(messagesList =>{
            response.status(HttpStatus.OK).json(messagesList);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({message:"There was an error getting the message list"});
        });
    }

    @Post()
    create(@Body () newMessage:Message, @Res() response){
        this.messageService.createMessage(newMessage).then(message =>{
            response.status(HttpStatus.CREATED).json(message);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({message:"There was an error creating the message"});
        });
    }

    @Put(':id')
    update(@Body () messageToUpdate:Message, @Res() response, @Param('id') idMessage){
        this.messageService.updateMessage(idMessage, messageToUpdate).then(message =>{
            response.status(HttpStatus.OK).json(message);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({message:"There was an error updating the message"});
        });
    }

    @Delete(':id')
    delete( @Param('id') idMessage, @Res() response){
        this.messageService.deleteMessage(idMessage).then(resp =>{
            response.status(HttpStatus.OK).json(resp);
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({message:"There was an error deleting the message"});
        });
    }
    
}
