import { TransactionController } from '@/application/controllers'
import { TransactionAccountService } from '@/data/services'
import { PgTransactionAccountRepository } from '@/infra/postgres/repos'

export const makeTransactionAccountController = (): TransactionController => {
  const userAccountRepository = new PgTransactionAccountRepository()
  const transactionAccountService = new TransactionAccountService(userAccountRepository)
  return new TransactionController(transactionAccountService)
}
