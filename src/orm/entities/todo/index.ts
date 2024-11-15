import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("todos")
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  completed!: boolean;
}
