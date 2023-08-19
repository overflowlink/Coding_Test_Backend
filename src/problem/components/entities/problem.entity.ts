import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ExampleEntity } from './example.entity';
import { TestcaseEntity } from './testcase.entity';
import { SubmissionEntity } from './submission.entity';

@Entity({name: "problem"})
export class ProblemEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string


    @Column()
    timeLimitSecond: number

    @Column()
    memoryLimitMb: number


    @Column({type: "blob"})
    problemExplain: Buffer

    @Column({type: "blob"})
    inputExplain: Buffer

    @Column({type: "blob"})
    outputExplain: Buffer

    @Column({type: "blob"})
    note: Buffer


    @OneToMany(type => ExampleEntity, example => example.problem)
    examples: ExampleEntity[]

    @OneToMany(type => TestcaseEntity, testcase => testcase.problem)
    testcases: TestcaseEntity[]

    @OneToMany(type => SubmissionEntity, submission => submission.problem)
    submissions: SubmissionEntity[]
}
