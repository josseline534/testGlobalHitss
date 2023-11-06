import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    name: string

  @CreateDateColumn()
    dateInit: Date

  @Column({ nullable: true })
    dateEnd: Date
}
