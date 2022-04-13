import { TransactionAccount } from '@/domain/features'
import { TransactionAccountModel } from '@/domain/models'
import { InternalServerError } from '@/domain/models/errors'
import { CreateTransactionAccoutRepository, LoadTransactionAccoutRepository } from '../contracts/repos'

export class TransactionAccountService {
  constructor (
    private readonly loadTransactionAccount: LoadTransactionAccoutRepository,
    private readonly createTransactionAccount: CreateTransactionAccoutRepository
  ) {}

  async perform (input: TransactionAccount.Input): Promise<null | InternalServerError |TransactionAccountModel> {
    const searchTransactionAccount = await this.loadTransactionAccount.load({ vatNumber: input.vatNumber })
    if (searchTransactionAccount !== null) {
      return searchTransactionAccount
    } else {
      const createTransactionAccount = await this.createTransactionAccount.create(input)
      return createTransactionAccount
    }
  }
}
