import { User } from "src/user/entity/user.entity";
import { Word } from "src/word/entity/word.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Page {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne( (type)=>User, (user)=> user.userId, { nullable: false } )
    user: User;

    @OneToOne( (type)=>Word, word=>word.id)
    word: Word;
}