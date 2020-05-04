import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import bunyan from 'bunyan'
import { ApolloServer } from 'apollo-server'
import typeDefs from '../graphql/typeDefs'
import resolvers from '../graphql/resolvers'

import { User } from '../db/entity/User'
import { LoggingPlugin } from './plugins/loggingPlugin'

const connection: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: process.env.NODE_ENV === 'production',
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['dist/db/entity/**/*.js'],
  migrations: ['dist/db/migration/**/*.js'],
  subscribers: ['dist/db/subscriber/**/*.js'],
}
;(async (): Promise<void> => {
  const logger = bunyan.createLogger({
    name: 'i-love-me-service',
  })

  const dbConnection = await createConnection(connection)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    logger,
    context: {
      dbConnection,
      User,
    },
    plugins: [LoggingPlugin],
  })

  const port = process.env.port || 3000

  await server.listen(port)
  logger.info({
    message: `i-love-me-service listening on port ${port}`,
  })
})()
