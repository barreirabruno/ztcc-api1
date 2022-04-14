import { TransactionAccount } from '@/domain/features'
import { InternalServerError } from '@/domain/models/errors'
import { CreateTransactionAccoutRepository, LoadTransactionAccoutRepository, UpdateTransactionAccoutRepository } from '../contracts/repos'

export class TransactionAccountService {
  constructor (
    private readonly userAccountRepo: LoadTransactionAccoutRepository &
    CreateTransactionAccoutRepository &
    UpdateTransactionAccoutRepository
  ) {}

  async perform (input: TransactionAccount.Input): Promise<InternalServerError> {
    const searchTransactionAccount = await this.userAccountRepo.load({ vatNumber: input.vatNumber })
    if (searchTransactionAccount !== null) {
      await this.userAccountRepo.update(input)
    } else {
      await this.userAccountRepo.create(input)
    }
    return new InternalServerError()
  }
}
