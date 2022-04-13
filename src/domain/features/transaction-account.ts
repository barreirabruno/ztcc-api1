import { TransactionAccountModel } from '../models'

export interface TransactionAccountInterface {
  perform: (params: TransactionAccount.Input) => Promise<TransactionAccount.Output>
}

export namespace TransactionAccount {
  export type Input = {
    first_name: string
    last_name: string
    vatNumber: string
  }
  export type Output = TransactionAccountModel
}
