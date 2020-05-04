import { Connection } from 'typeorm'
import Logger from 'bunyan'

import { User } from '../db/entity/User'
import { Accomplishment } from '../db/entity/Accomplishment'

export interface Context {
  dbConnection: Connection
  User: typeof User
  Accomplishment: typeof Accomplishment
  logger: Logger
}
