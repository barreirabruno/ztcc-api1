import { TransactionAccount, TransactionAccountInterface } from '@/domain/features'
import { TransactionAccountModel } from '@/domain/models'
import { SaveTransactionAccoutRepository, LoadTransactionAccoutRepository } from '../contracts/repos'

export class TransactionAccountService implements TransactionAccountInterface {
  constructor (
    private readonly userAccountRepo: LoadTransactionAccoutRepository &
    SaveTransactionAccoutRepository
  ) {}

  async perform (input: TransactionAccount.Input): Promise<TransactionAccount.Output> {
    const searchTransactionAccount = await this.userAccountRepo.load({ vatNumber: input.vatNumber })
    const transactionAccountEntity = new TransactionAccountModel(input, searchTransactionAccount)
    return await this.userAccountRepo.save(transactionAccountEntity)
  }
}
