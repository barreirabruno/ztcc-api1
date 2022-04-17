import './config/module-alias'

import 'reflect-metadata'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { createConnection } from 'typeorm'

createConnection()
  .then(() => app.listen(env.serverPort, () => console.log(`[SERVER UP AND RUNNING AT PORT ${env.serverPort}]`)))
  .catch(console.error)
