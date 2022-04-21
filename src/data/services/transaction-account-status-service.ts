import { TransactionAccountStatus, TransactionAccountStatusInterface } from '@/domain/features'
import { LoadTransactionAccoutRepository } from '../contracts/repos'

export class TransactionAccountStatusService implements TransactionAccountStatusInterface {
  constructor (private readonly transactionAccountRepo: LoadTransactionAccoutRepository) {}

  async perform (params: TransactionAccountStatus.Input): Promise<TransactionAccountStatus.Output> {
    const searchTransactionAccount = await this.transactionAccountRepo.load({ vatNumber: params.vatNumber })
    if (searchTransactionAccount?.active === 1) {
      return {
        status: TransactionAccountStatus.TransactionAccountStatusEnum.AVAILABLE
      }
    } else {
      return {
        status: TransactionAccountStatus.TransactionAccountStatusEnum.UNAVAILABLE
      }
    }
  }
}
