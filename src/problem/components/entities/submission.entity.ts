import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ProblemEntity } from './problem.entity';

@Entity({name: "submission"})
export class SubmissionEntity {
    @PrimaryGeneratedColumn()
    id: number


    @Column({ nullable: true })
    timeSecond: number
    
    @Column({ nullable: true })
    memoryMb: number

    @Column()
    verdict: string


    @Column()
    language: string

    @Column({type: "blob"})
    code: Buffer


    @CreateDateColumn()
    sentAt: Date

    @Column({ nullable: true })
    judgedAt: Date


    @ManyToOne(type => ProblemEntity, problem => problem.examples)
    problem: ProblemEntity
}
