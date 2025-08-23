import { Entity, Column, PrimaryColumn, BeforeInsert, OneToMany } from "typeorm"
import { v7 } from "uuid"
import { User } from "./user.entity"

@Entity('role')
export class Role {

    @PrimaryColumn('uuid')
    id: string

    @Column('text')
    name: string

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = v7()
        }
    }

    @OneToMany(() => User, user => user.role)
    users: User[]
}
