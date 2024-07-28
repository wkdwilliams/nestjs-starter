import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";
import { User } from "../../user/entities/user.entity";

@Entity({
    name:     'booking',
    database: 'booking',
})
export class Booking {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column()
    user_id: number;

    @Column()
    restaurant_id: number;

    @Column({
        type: 'datetime'
    })
    booking_from: Date;

    @Column({
        type: 'datetime'
    })
    booking_to: Date;

    @Column()
    number_of_people: number;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (u) => u.booking)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Restaurant, (u) => u.booking)
    @JoinColumn({ name: 'restaurant_id' })
    restaurant: Restaurant;
}
