import { TransactionAccountStatusController } from '@/application/controllers'
import { TransactionAccountStatusService } from '@/data/services'
import { PgTransactionAccountRepository } from '@/infra/postgres/repos'

export const makeTransactionAccountControllerStatus = (): TransactionAccountStatusController => {
  const userAccountRepository = new PgTransactionAccountRepository()
  const transactionAccountStatusService = new TransactionAccountStatusService(userAccountRepository)
  return new TransactionAccountStatusController(transactionAccountStatusService)
}
