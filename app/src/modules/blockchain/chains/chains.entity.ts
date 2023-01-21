import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "chains" })
export class ChainEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  chainId: number;

  @Column()
  name: string;

  @Column()
  nativeCurrency: string;
}
