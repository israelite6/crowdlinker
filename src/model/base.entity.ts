import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  created_by: string | null;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  updated_by: string | null;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internal_comment: string | null;
}
