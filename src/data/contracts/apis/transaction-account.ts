export interface LoadTransactionAccout {
  loadTransactionAccount: (input: LoadTransactionAccout.Input) => Promise<LoadTransactionAccout.Output>
}

export namespace LoadTransactionAccout {
  export type Input = {
    vatNumber: string
  }
  export type Output = null
}
