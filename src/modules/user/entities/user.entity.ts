// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// enum UserRole {
//   ADMIN = 'ADMIN',
//   USER = 'USER',
// }

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string;

//   @Column({
//     type: 'enum',
//     enum: UserRole,
//     default: UserRole.USER,
//   })
//   role: UserRole;

//   @Column({ default: true })
//   isActive: boolean;

//   @CreateDateColumn({ type: 'timestamp' })
//   createdAt: Date;

//   @UpdateDateColumn({ type: 'timestamp' })
//   updatedAt: Date;
// }
