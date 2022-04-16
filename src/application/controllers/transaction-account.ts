import { TransactionAccountInterface } from '@/domain/features/'
import { InternalServerError, ServerError } from '@/domain/models/errors'
import { HttpResponse } from '../helpers'

export class TransactionController {
  constructor (
    private readonly transactionControllerService: TransactionAccountInterface
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.vatNumber === '' ||
      httpRequest.vatNumber === null ||
      httpRequest.vatNumber === undefined) {
        return {
          statusCode: 400,
          data: new Error('The field vatNumber is required')
        }
      }
      const result = await this.transactionControllerService.perform({
        first_name: httpRequest.first_name,
        last_name: httpRequest.last_name,
        vatNumber: httpRequest.vatNumber
      })
      if (result.constructor === InternalServerError ||
        result.constructor === Error) {
        return {
          statusCode: 500,
          data: result
        }
      } else {
        return {
          statusCode: 200,
          data: result
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: new ServerError(error as Error)
      }
    }
  }
}
