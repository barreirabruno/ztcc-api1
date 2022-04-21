export interface TransactionAccountStatusInterface {
  perform: (params: TransactionAccountStatus.Input) => Promise<TransactionAccountStatus.Output>
}

export namespace TransactionAccountStatus {
  export enum TransactionAccountStatusEnum {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable'
  }

  export type Input = {
    vatNumber: string
  }
  export type Output = {
    status: TransactionAccountStatusEnum
  }
}
