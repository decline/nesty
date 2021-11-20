import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPassword1637425406395 implements MigrationInterface {
    name = 'UserPassword1637425406395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
