import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProblemEntity } from './problem.entity';

@Entity({name: "example"})
export class ExampleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "blob"})
    inputValue: Buffer

    @Column({type: "blob"})
    outputValue: Buffer


    @ManyToOne(type => ProblemEntity, problem => problem.examples)
    problem: ProblemEntity
}
