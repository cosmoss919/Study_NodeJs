import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()   //엔티티 객체 데코레이터
export class User {
    @PrimaryGeneratedColumn()
    id?: number;    //id는 pk이며 자동 증가하는 값

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true})
    password: string;

    @Column()
    username: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    //기본값 세팅
    createdDt: Date = new Date();

    @Column({nullable: true})
    providerId: string;
}