import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DAO_EXTRA_LINK_TYPE } from "../../domain/constants/dao-extra-link.enum";
import { DaoEntity } from "./dao.entity";

@Entity({ name: "dao_extra_links" })
export class DaoExtraLinkEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    enum: DAO_EXTRA_LINK_TYPE,
  })
  type: DAO_EXTRA_LINK_TYPE;

  @Column()
  url: string;

  @ManyToOne(() => DaoEntity, (dao) => dao.extraLinks)
  dao: DaoEntity;
}
