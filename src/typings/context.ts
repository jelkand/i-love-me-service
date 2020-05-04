import { Connection } from 'typeorm'
import Logger from 'bunyan'

import { User } from '../db/entity/User'

export interface Context {
  dbConnection: Connection
  User: typeof User
  logger: Logger
}
