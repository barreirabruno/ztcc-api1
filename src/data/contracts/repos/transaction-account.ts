import { InternalServerError } from '@/domain/models/errors'

export interface LoadTransactionAccoutRepository {
  load: (input: LoadTransactionAccout.Input) => Promise<LoadTransactionAccout.Output>
}

export namespace LoadTransactionAccout {
  export type Input = {
    vatNumber: string
  }
  export type Output = null | undefined | {
    id: string
    first_name?: string
    last_name?: string
    vatNumber: string
  }
}

export interface SaveTransactionAccoutRepository {
  save: (input: SaveTransactionAccoutRepository.Input) => Promise<SaveTransactionAccoutRepository.Output>
}

export namespace SaveTransactionAccoutRepository {
  export type Input = {
    id?: string
    first_name?: string
    last_name?: string
    vatNumber: string
  }
  export type Output = {
    id: string
    first_name: string
    last_name: string
    vatNumber: string
  } | InternalServerError
}
