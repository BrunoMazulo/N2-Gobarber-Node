import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class AddforeignkeyAppointments1595199278838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Para relacionar a tabela appointments com a tabela users, os campos id <-> provider_id
      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL', // Caso seja excluido, só ira setar null, 'CASCADE' deletaria tudo relacionado
        onUpdate: 'CASCADE',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    }

}
