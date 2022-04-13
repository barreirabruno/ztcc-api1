import { TransactionAccount } from '@/domain/features'
import { NotFoundError } from '@/domain/models/errors'
import { LoadTransactionAccout } from '../contracts/apis'

export class TransactionAccountService {
  constructor (
    private readonly loadTA: LoadTransactionAccout
  ) {}

  async perform (input: TransactionAccount.Input): Promise<NotFoundError> {
    await this.loadTA.loadTransactionAccount(input)
    return new NotFoundError()
  }
}
