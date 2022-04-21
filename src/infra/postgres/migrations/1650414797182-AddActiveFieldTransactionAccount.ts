import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddActiveFieldTransactionAccount1650414797182 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pg_transaction_account',
      new TableColumn({
        name: 'active',
        type: 'int',
        isNullable: true,
        default: 1
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pg_transaction_accounts', 'active')
  }
}
