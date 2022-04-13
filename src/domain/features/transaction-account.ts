import { TransactionAccountModel } from '../models'
import { NotFoundError } from '../models/errors'

export interface TransactionAccountInterface {
  perform: (params: TransactionAccount.Input) => Promise<TransactionAccount.Output>
}

export namespace TransactionAccount {
  export type Input = {
    vatNumber: string
  }
  export type Output = TransactionAccountModel | NotFoundError
}
