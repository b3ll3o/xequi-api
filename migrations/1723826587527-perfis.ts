import { MigrationInterface, QueryRunner } from "typeorm";

export class Perfis1723826587527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('INSERT INTO perfis VALUES ')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
