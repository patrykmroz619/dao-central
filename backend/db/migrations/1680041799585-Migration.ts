import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1680041799585 implements MigrationInterface {
    name = 'Migration1680041799585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jwts" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUsed" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_9c569370df81e4785921299d379" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rpc_providers_type_enum" AS ENUM('https', 'wss')`);
        await queryRunner.query(`CREATE TABLE "rpc_providers" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "type" "public"."rpc_providers_type_enum" NOT NULL, "errorsCount" integer NOT NULL DEFAULT '0', "usageCount" integer NOT NULL DEFAULT '0', "lastUsage" TIMESTAMP, "chainId" integer, CONSTRAINT "UQ_4c3e76e044d57b4f0cbd628ca4b" UNIQUE ("url"), CONSTRAINT "PK_3dfd2b6f09e5e80963c968d5348" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chains" ("id" SERIAL NOT NULL, "chainId" integer NOT NULL, "name" character varying NOT NULL, "nativeCurrency" character varying NOT NULL, CONSTRAINT "UQ_39cc24e81c2174f426e8b7f6061" UNIQUE ("chainId"), CONSTRAINT "PK_f3c6ca7e7ad0f451e3b8f3dd378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "daos" ("id" SERIAL NOT NULL, "contractAddress" character varying NOT NULL, "organization" character varying NOT NULL, "nftAddress" character varying NOT NULL, "ownerId" uuid, "chainId" integer, CONSTRAINT "PK_239c5beb588a61db3022200d795" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "walletAddress" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "init_logins" ("id" SERIAL NOT NULL, "wallet" character varying NOT NULL, "code" character varying NOT NULL, "active" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e1f2a6bc6807c5b976b08595a66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jwts" ADD CONSTRAINT "FK_054df30dbb3857982f40587732a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rpc_providers" ADD CONSTRAINT "FK_98a988e0dda1f32b993205d84bf" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daos" ADD CONSTRAINT "FK_f8bffa1b030d820e53d4b549669" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daos" ADD CONSTRAINT "FK_14039f83ec65920cf430e52de58" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daos" DROP CONSTRAINT "FK_14039f83ec65920cf430e52de58"`);
        await queryRunner.query(`ALTER TABLE "daos" DROP CONSTRAINT "FK_f8bffa1b030d820e53d4b549669"`);
        await queryRunner.query(`ALTER TABLE "rpc_providers" DROP CONSTRAINT "FK_98a988e0dda1f32b993205d84bf"`);
        await queryRunner.query(`ALTER TABLE "jwts" DROP CONSTRAINT "FK_054df30dbb3857982f40587732a"`);
        await queryRunner.query(`DROP TABLE "init_logins"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "daos"`);
        await queryRunner.query(`DROP TABLE "chains"`);
        await queryRunner.query(`DROP TABLE "rpc_providers"`);
        await queryRunner.query(`DROP TYPE "public"."rpc_providers_type_enum"`);
        await queryRunner.query(`DROP TABLE "jwts"`);
    }

}
