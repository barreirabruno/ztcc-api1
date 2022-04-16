import { TransactionAccountInterface } from '@/domain/features/'
import { InternalServerError } from '@/domain/models/errors'
import { badRequest, HttpResponse, ok, serverError } from '@/application/helpers'
import { RequiredStringValidator } from '../validation'

type HttpRequest = {
  first_name?: string
  last_name?: string
  vatNumber: string
}

type Model = Error | {
  id?: string
  first_name?: string
  last_name?: string
  vatNumber: string
}

export class TransactionController {
  constructor (
    private readonly transactionControllerService: TransactionAccountInterface
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }
      const result = await this.transactionControllerService.perform({
        first_name: httpRequest?.first_name,
        last_name: httpRequest?.last_name,
        vatNumber: httpRequest?.vatNumber
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

  private validate (httpRequest: HttpRequest): Error | undefined {
    const validator = new RequiredStringValidator(httpRequest.vatNumber, 'vatNumber')
    return validator.validate()
  }
}
