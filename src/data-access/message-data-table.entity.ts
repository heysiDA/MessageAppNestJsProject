import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MessageDataTable {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nick:string;

    @Column()
    message:string;
}
