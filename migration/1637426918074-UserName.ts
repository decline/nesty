import {MigrationInterface, QueryRunner} from "typeorm";

export class UserName1637426918074 implements MigrationInterface {
    name = 'UserName1637426918074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userName\``);
    }

}
