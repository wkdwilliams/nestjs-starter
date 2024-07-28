import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Exclude({ toPlainOnly: true })
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Exclude({ toPlainOnly: true })
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

}
