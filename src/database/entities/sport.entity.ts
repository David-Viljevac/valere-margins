import { Entity, Column, OneToMany, BeforeInsert, PrimaryColumn } from "typeorm"
import { Class } from "./class.entity"
import { v7 } from "uuid"

@Entity('sport')
export class Sport {

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

    @OneToMany(() => Class, classEntity => classEntity.sport)
    classes: Class[]
}
