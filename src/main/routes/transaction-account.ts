import { adaptExpressRoute } from '@/infra/http'
import { Router } from 'express'
import { makeTransactionAccountController } from '../factories'

export default (router: Router): void => {
  const controller = makeTransactionAccountController()
  router.post('/account', adaptExpressRoute(controller))
}
