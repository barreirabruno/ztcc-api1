import { TransactionAccountInterface } from '@/domain/features/'
import { InternalServerError } from '@/domain/models/errors'
import { HttpResponse, ok, serverError } from '@/application/helpers'
import { ValidationBuilder, Validator } from '@/application/validation'
import { Controller } from '@/application/controllers'

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

export class TransactionController extends Controller {
  constructor (
    private readonly transactionControllerService: TransactionAccountInterface
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
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
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httpRequest.vatNumber, fieldName: 'vatNumber' }).required().build()
    ]
  }
}
