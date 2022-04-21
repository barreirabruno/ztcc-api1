interface IsAccountActiveInterface {
  perform: (params: IsAccountActive.Input) => Promise<IsAccountActive.Output>
}

export namespace IsAccountActive {
  export type Input = {
    vatNumber: string
  }
  export type Output = {
    status: string
  }
}

class IsAccountActiveService implements IsAccountActiveInterface {
  async perform (params: IsAccountActive.Input): Promise<IsAccountActive.Output> {
    return {
      status: 'available'
    }
  }
}

describe('IsAccountActiveService', () => {
  let sut: IsAccountActiveService

  beforeAll(() => {
    sut = new IsAccountActiveService()
  })

  it('should return available if active is equal to 1', async () => {
    const transactionAccountStatus = await sut.perform({ vatNumber: 'any_vatnumber' })

    expect(transactionAccountStatus).toEqual({
      status: 'available'
    })
  })
  it('should return unavailable if active is not 1', () => {})
  it('should return unavailable if transaction account is not found', () => {})
})
