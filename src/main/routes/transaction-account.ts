import { adaptExpressRoute } from '@/infra/http'
import { Router } from 'express'
import { makeTransactionAccountController, makeTransactionAccountControllerStatus } from '../factories'

export default (router: Router): void => {
  const controller = makeTransactionAccountController()
  const transactionAccountStatusController = makeTransactionAccountControllerStatus()
  router.post('/account', adaptExpressRoute(controller))
  router.post('/account/status', adaptExpressRoute(transactionAccountStatusController))
}
