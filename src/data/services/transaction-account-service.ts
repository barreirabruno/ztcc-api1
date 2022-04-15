import { TransactionAccount } from '@/domain/features'
import { InternalServerError } from '@/domain/models/errors'
import { SaveTransactionAccoutRepository, LoadTransactionAccoutRepository } from '../contracts/repos'

export class TransactionAccountService {
  constructor (
    private readonly userAccountRepo: LoadTransactionAccoutRepository &
    SaveTransactionAccoutRepository
  ) {}

  async perform (input: TransactionAccount.Input): Promise<InternalServerError> {
    const searchTransactionAccount = await this.userAccountRepo.load({ vatNumber: input.vatNumber })
    await this.userAccountRepo.save({
      id: searchTransactionAccount?.id ?? input.id,
      first_name: input.first_name,
      last_name: input.last_name,
      vatNumber: input.vatNumber
    })
    return new InternalServerError()
  }
}
