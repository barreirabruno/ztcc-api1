import { TransactionAccount } from '@/domain/features'
import { TransactionAccountModel } from '@/domain/models'
import { InternalServerError } from '@/domain/models/errors'
import { SaveTransactionAccoutRepository, LoadTransactionAccoutRepository } from '../contracts/repos'

export class TransactionAccountService {
  constructor (
    private readonly userAccountRepo: LoadTransactionAccoutRepository &
    SaveTransactionAccoutRepository
  ) {}

  async perform (input: TransactionAccount.Input): Promise<InternalServerError> {
    const searchTransactionAccount = await this.userAccountRepo.load({ vatNumber: input.vatNumber })
    const transactionAccountEntity = new TransactionAccountModel(input, searchTransactionAccount)
    await this.userAccountRepo.save(transactionAccountEntity)
    return new InternalServerError()
  }
}
