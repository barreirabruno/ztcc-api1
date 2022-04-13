export class NotFoundError extends Error {
  constructor () {
    super('Transaction Account not found')
    this.name = 'NOT_FOUND_ERROR'
  }
}
