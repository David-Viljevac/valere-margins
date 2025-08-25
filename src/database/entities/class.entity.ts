import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, PrimaryColumn, OneToMany } from "typeorm"
import { Sport } from "./sport.entity"
import { v7 } from "uuid"
import { UserClass } from "./user-class.entity"

// Define the enum for days of the week
export enum DayOfWeek {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday'
}

@Entity('class')
export class Class {
    @PrimaryColumn('uuid')
    id: string

    @Column('uuid')
    sport_id: string

    @Column('timetz')
    start_time: string

    @Column('timetz') 
    end_time: string

    @Column('text')
    description: string

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    edited_at: Date

    @Column('boolean')
    is_active: boolean

    @Column({
        type: 'enum',
        enum: DayOfWeek,
        array: true
    })
    active_days: DayOfWeek[]

    @BeforeInsert()
    generateId() {
        if (!this.id) {
            this.id = v7()
        }
    }

    @ManyToOne(() => Sport, sport => sport.classes)
    @JoinColumn({ name: 'sport_id' })
    sport: Sport

    // Many-to-Many relationship through junction table
    @OneToMany(() => UserClass, userClass => userClass.class)
    userClasses: UserClass[]
}