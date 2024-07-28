import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

export abstract class AbstractDateEntity {
    @Exclude({ toPlainOnly: true })
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    updateTimestampsOnInsert() {
      const now = new Date();
      this.created_at = now;
      this.updated_at = now;
    }
  
    @BeforeUpdate()
    updateTimestampOnUpdate() {
      this.updated_at = new Date();
    }

}
