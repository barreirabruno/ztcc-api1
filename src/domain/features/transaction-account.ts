import { TransactionAccountModel } from '../models'
import { InternalServerError } from '../models/errors'

export interface TransactionAccountInterface {
  perform: (params: TransactionAccount.Input) => Promise<TransactionAccount.Output>
}

export namespace TransactionAccount {
  export type Input = {
    id?: string
    first_name?: string
    last_name?: string
    vatNumber: string
  }
  export type Output = TransactionAccountModel | InternalServerError
}
