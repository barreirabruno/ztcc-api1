import { TransactionAccountModel } from '@/domain/models'

const inputData = {
  id: 'any_input_valid_id',
  first_name: 'any_input_firstname',
  last_name: 'any_input_lastname',
  vatNumber: 'any_input_vatNumber',
  active: 1
}

const loadData = {
  id: 'any_load_valid_id',
  first_name: 'any_load_firstname',
  last_name: 'any_load_lastname',
  vatNumber: 'any_load_vatNumber',
  active: 1
}

describe('TransactionAccountModel', () => {
  it('should create a transaction Account with input data only', () => {
    const sut = new TransactionAccountModel(inputData)

    expect(sut).toEqual({
      id: 'any_input_valid_id',
      first_name: 'any_input_firstname',
      last_name: 'any_input_lastname',
      vatNumber: 'any_input_vatNumber',
      active: 1
    })
  })

  it('should update transaction account with first_name and last_name input data', () => {
    const sut = new TransactionAccountModel({
      first_name: 'any_input_firstname',
      vatNumber: 'any_input_vatNumber'
    }, loadData)

    expect(sut).toEqual({
      id: 'any_load_valid_id',
      first_name: 'any_input_firstname',
      last_name: 'any_load_lastname',
      vatNumber: 'any_load_vatNumber',
      active: 1
    })
  })
})
