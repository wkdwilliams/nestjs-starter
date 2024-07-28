import { MigrationInterface, QueryRunner } from "typeorm";

export class BookingDatetime1722101578967 implements MigrationInterface {
    name = 'BookingDatetime1722101578967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`booking_from\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`booking_from\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`booking_to\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`booking_to\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`booking_to\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`booking_to\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`booking_from\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`booking_from\` timestamp NOT NULL`);
    }

}
