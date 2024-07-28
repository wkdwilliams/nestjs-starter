import { MigrationInterface, QueryRunner } from "typeorm";

export class RestaurantNumberOfTables1722110048696 implements MigrationInterface {
    name = 'RestaurantNumberOfTables1722110048696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant\` ADD \`number_of_tables\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant\` DROP COLUMN \`number_of_tables\``);
    }

}
