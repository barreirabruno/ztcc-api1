import { InternalServerError } from '@/domain/models/errors'

export interface LoadTransactionAccoutRepository {
  load: (input: LoadTransactionAccout.Input) => Promise<LoadTransactionAccout.Output>
}

export namespace LoadTransactionAccout {
  export type Input = {
    vatNumber: string
  }
  export type Output = null | InternalServerError | {
    id: string
    first_name: string
    last_name: string
    vatNumber: string
  }
}

export interface CreateTransactionAccoutRepository {
  create: (input: LoadTransactionAccout.Input) => Promise<LoadTransactionAccout.Output>
}

export namespace CreateTransactionAccoutRepository {
  export type Input = {
    first_name: string
    last_name: string
    vatNumber: string
  }
  export type Output = null | {
    id: string
    first_name: string
    last_name: string
    vatNumber: string
  }
}
