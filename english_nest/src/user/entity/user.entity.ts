import { Page } from "src/page/entity/page.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    userId: string;

    @Column()
    nickname: string;

    @OneToMany((type)=> Page, (page) => page.id )
    pages: Page[];
}