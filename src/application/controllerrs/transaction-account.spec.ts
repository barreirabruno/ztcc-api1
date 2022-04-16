type HttpResponse = {
  statusCode: number
  data: any
}

class TransactionController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The field vatNumber is required')
    }
  }
}

describe('TransactionAccountController', () => {
  it('should return 400 if vatNumber is empty', async () => {
    const sut = new TransactionController()

    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name'
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field vatNumber is required')
    })
  })

  it('should return 400 if vatNumber is null', async () => {
    const sut = new TransactionController()

    const httpResponse = await sut.handle({
      first_name: 'any_user_name',
      last_name: 'any_last_user_name',
      vatNumber: null
    })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field vatNumber is required')
    })
  })
})
