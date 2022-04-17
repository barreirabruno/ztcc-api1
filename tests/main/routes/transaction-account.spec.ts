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
      await request(app)
        .post('/ztcc/v1/account')
        .send(params)
        .expect(200)
        .expect({ id: '1', ...params })
    })

    it('should return 200 with a new Transaction Account only with vatNumber', async () => {
      const params = {
        vatNumber: 'xxxxxxxxxxx'
      }
      await request(app)
        .post('/ztcc/v1/account')
        .send(params)
        .expect(200)
        .expect({ id: '1', first_name: null, last_name: null, vatNumber: 'xxxxxxxxxxx' })
    })

    it('should return 200 with and update a transaction account firtst_name and last_name', async () => {
      const paramsCreateTA = {
        vatNumber: 'xxxxxxxxxxx'
      }
      await request(app)
        .post('/ztcc/v1/account')
        .send(paramsCreateTA)
        .expect(200)
        .expect({ id: '1', first_name: null, last_name: null, vatNumber: 'xxxxxxxxxxx' })

      const paramsUpdateTA = {
        first_name: 'any_user_name_[UPDATE]',
        last_name: 'any_last_user_name_[UPDATE]',
        vatNumber: 'xxxxxxxxxxx'
      }
      await request(app)
        .post('/ztcc/v1/account')
        .send(paramsUpdateTA)
        .expect(200)
        .expect({ id: '1', first_name: 'any_user_name_[UPDATE]', last_name: 'any_last_user_name_[UPDATE]', vatNumber: 'xxxxxxxxxxx' })
    })

    it('should return 400 if no vatNumber is provided', async () => {
      const params = {}
      await request(app)
        .post('/ztcc/v1/account')
        .send(params)
        .expect(400)
        .expect({ error: 'The field vatNumber is required' })
    })
  })
})
