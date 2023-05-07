import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683478136633 implements MigrationInterface {
    name = 'Migration1683478136633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dao_extra_links" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "daoId" integer, CONSTRAINT "PK_79c211928206eea4c0453d3e900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "daos" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "dao_extra_links" ADD CONSTRAINT "FK_ad3444ddad3c1d415b6de4c6708" FOREIGN KEY ("daoId") REFERENCES "daos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dao_extra_links" DROP CONSTRAINT "FK_ad3444ddad3c1d415b6de4c6708"`);
        await queryRunner.query(`ALTER TABLE "daos" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "dao_extra_links"`);
    }

}
