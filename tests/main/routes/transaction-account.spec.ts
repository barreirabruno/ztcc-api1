import request from 'supertest'
import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'

import { PgTransactionAccount } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

describe('Transaction account routes', () => {
  describe('POST /account', () => {
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgTransactionAccount])
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 200 with a new Transaction Account', async () => {
      const params = {
        first_name: 'any_user_name',
        last_name: 'any_last_user_name',
        vatNumber: 'xxxxxxxxxxx'
      }
      const expectedTransactionAccount = {
        id: '1',
        ...params,
        active: 1
      }
      const { status, body } = await request(app)
        .post('/ztcc/v1/account')
        .send(params)

      expect(status).toBe(200)
      expect(body).toEqual(expectedTransactionAccount)
    })

    it('should return 200 with a new Transaction Account only with vatNumber', async () => {
      const params = {
        vatNumber: 'xxxxxxxxxxx'
      }
      const expectedTransactionAccount = {
        id: '1',
        first_name: null,
        last_name: null,
        vatNumber: 'xxxxxxxxxxx',
        active: 1
      }
      const { status, body } = await request(app)
        .post('/ztcc/v1/account')
        .send(params)

      expect(status).toBe(200)
      expect(body).toEqual(expectedTransactionAccount)
    })

    it('should return 200 with and update a transaction account firtst_name and last_name', async () => {
      const paramsCreateTA = {
        vatNumber: 'xxxxxxxxxxx'
      }
      const expectedTransactionAccount = {
        id: '1',
        first_name: null,
        last_name: null,
        vatNumber: 'xxxxxxxxxxx',
        active: 1
      }
      const createTARequest = await request(app)
        .post('/ztcc/v1/account')
        .send(paramsCreateTA)

      expect(createTARequest.status).toBe(200)
      expect(createTARequest.body).toEqual(expectedTransactionAccount)

      const expectedTransactionAccountUpdate = {
        id: '1',
        first_name: 'any_user_name_[UPDATE]',
        last_name: 'any_last_user_name_[UPDATE]',
        vatNumber: 'xxxxxxxxxxx',
        active: 1
      }

      const paramsUpdateTA = {
        first_name: 'any_user_name_[UPDATE]',
        last_name: 'any_last_user_name_[UPDATE]',
        vatNumber: 'xxxxxxxxxxx'
      }
      const updateTARequest = await request(app)
        .post('/ztcc/v1/account')
        .send(paramsUpdateTA)

      expect(updateTARequest.status).toBe(200)
      expect(updateTARequest.body).toEqual(expectedTransactionAccountUpdate)
    })

    it('should return 400 if no vatNumber is provided', async () => {
      const params = {}
      const { status, body } = await request(app)
        .post('/ztcc/v1/account')
        .send(params)

      expect(status).toBe(400)
      expect(body).toEqual({ error: 'The field vatNumber is required' })
    })
  })
})
