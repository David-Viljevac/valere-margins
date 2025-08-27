import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryColumn, ManyToMany } from "typeorm"
import { User } from "./user.entity"
import { Class } from "./class.entity"

@Entity('user_class')
export class UserClass {
    @PrimaryColumn('uuid')
    user_id: string

    @PrimaryColumn('uuid')
    class_id: string

    @CreateDateColumn({ type: 'timestamptz' })
    joined_at: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    left_at: Date

    @ManyToOne(() => User, user => user.userClasses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Class, classEntity => classEntity.userClasses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'class_id' })
    class: Class
}