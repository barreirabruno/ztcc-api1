type TransactionAccountData = {
  id?: string
  first_name?: string
  last_name?: string
  vatNumber: string
}

type LoadTransactionAccountData = {
  id: string
  first_name?: string
  last_name?: string
  vatNumber: string
  active: number
} | null

export class TransactionAccountModel {
  id?: string
  first_name?: string
  last_name?: string
  vatNumber: string
  active?: number

  constructor (transactionAccountData: TransactionAccountData,
    loadTransactionAccount?: LoadTransactionAccountData) {
    this.id = loadTransactionAccount?.id ?? transactionAccountData.id
    this.first_name = transactionAccountData.first_name ?? loadTransactionAccount?.first_name
    this.last_name = transactionAccountData.last_name ?? loadTransactionAccount?.last_name
    this.vatNumber = loadTransactionAccount?.vatNumber ?? transactionAccountData.vatNumber
    this.active = loadTransactionAccount?.active ?? 1
  }
}
