import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TimezoneEnum } from "../../../components/enum/timezones.enum";
import { Booking } from "../../booking/entities/booking.entity";

@Entity({
    name:     'restaurant',
    database: 'booking',
})
export class Restaurant {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'json'
    })
    opening_days: number[];

    @Column({
        type: 'time'
    })
    open_from: Date;

    @Column({
        type: 'time'
    })
    open_to: Date;

    @Column({
        type: 'enum',
        enum: TimezoneEnum
    })
    timezone: TimezoneEnum;

    @Column()
    number_of_tables: number;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Booking, (b) => b.restaurant)
    booking: Booking[];
}
