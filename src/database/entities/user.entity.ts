import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryColumn, OneToMany } from "typeorm"
import { v7 } from "uuid"
import { Role } from "./role.entity"
import { UserClass } from "./user-class.entity"

@Entity('user')
export class User {
    @PrimaryColumn('uuid')
    id: string

    @Column('text')
    first_name: string

    @Column('text')
    last_name: string

    @Column('text')
    email: string

    @Column('uuid')
    role_id: string

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    edited_at: Date

    @Column('text')
    encrypted_password: string

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = v7()
        }
    }

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role

    // Many-to-Many relationship through junction table
    @OneToMany(() => UserClass, userClass => userClass.user)
    userClasses: UserClass[]
}