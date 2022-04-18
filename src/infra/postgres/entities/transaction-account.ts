import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class PgTransactionAccount {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  first_name!: string

  @Column({ nullable: true })
  last_name!: string

  @Column()
  vatNumber!: string

  @Column({ nullable: false, default: 1 })
  active!: number
}
