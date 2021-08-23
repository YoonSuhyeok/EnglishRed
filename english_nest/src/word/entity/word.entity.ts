import { Page } from "src/page/entity/page.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Word {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    top: string;

    @Column()
    bottom: string;

    @OneToOne( (type)=>Page, (page)=> page.id, { nullable: false })
    @JoinColumn()
    page: Page;

}