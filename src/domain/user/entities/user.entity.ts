import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "../../booking/entities/booking.entity";

@Entity({
    name:     'user',
    database: 'booking',
})
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column()
    username: string;

    @Column()
    @Exclude({toPlainOnly: true})
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Booking, (b) => b.user)
    booking: Booking[];
}
