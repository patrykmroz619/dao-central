import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "init_logins" })
export class InitLoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wallet: string;

  @Column()
  code: string;

  @Column()
  active: boolean;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
