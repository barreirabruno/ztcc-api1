import { TransactionAccountStatusService } from '@/data/services'
import { InternalServerError } from '@/domain/models/errors'
import { HttpResponse, serverError, ok } from '../helpers'
import { Validator, ValidationBuilder } from '../validation'
import { Controller } from './controller'

type HttpRequest = {
  vatNumber: string
}

type Model = Error | {
  status: string
}

export class TransactionAccountStatusController extends Controller {
  constructor (
    private readonly transactionAccountStatusService: TransactionAccountStatusService
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const result = await this.transactionAccountStatusService.perform({
      vatNumber: httpRequest.vatNumber
    })
    if (result.constructor === InternalServerError ||
      result.constructor === Error) {
      return serverError(result)
    } else {
      return ok(result)
    }
  }

  override buildValidators (httpRequest: any): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httpRequest.vatNumber, fieldName: 'vatNumber' })
        .required()
        .numerable()
        .vatNumberMinLength()
        .vatNumberMaxLength()
        .build()
    ]
  }
}
