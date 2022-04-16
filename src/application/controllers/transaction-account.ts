import { TransactionAccountInterface } from '@/domain/features/'
import { InternalServerError } from '@/domain/models/errors'
import { RequiredFieldError } from '../errors'
import { badRequest, HttpResponse, ok, serverError } from '@/application/helpers'

export class TransactionController {
  constructor (
    private readonly transactionControllerService: TransactionAccountInterface
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.vatNumber === '' ||
      httpRequest.vatNumber === null ||
      httpRequest.vatNumber === undefined) {
        return badRequest(new RequiredFieldError('vatNumber'))
      }
      const result = await this.transactionControllerService.perform({
        first_name: httpRequest.first_name,
        last_name: httpRequest.last_name,
        vatNumber: httpRequest.vatNumber
      })
      if (result.constructor === InternalServerError ||
        result.constructor === Error) {
        return serverError(result)
      } else {
        return ok(result)
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
