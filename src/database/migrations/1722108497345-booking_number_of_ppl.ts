import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingNumberOfPpl1722108497345 implements MigrationInterface {
    name = 'BookingNumberOfPpl1722108497345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`number_of_people\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`number_of_people\``);
    }

}
