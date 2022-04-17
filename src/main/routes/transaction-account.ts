import { Router } from 'express'

export default (router: Router): void => {
  router.post('/ztcc/v1/account', (req, res) => {
    res.send({
      data: 'any_data'
    })
  })
}
