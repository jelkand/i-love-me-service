import { QueryResolvers, Maybe, MutationResolvers } from '../typings/graphql'
import { User as dbUser } from '../db/entity/User'

const Query: QueryResolvers = {
  user: async (obj, { id }, { User }): Promise<Maybe<dbUser>> => {
    const result = await User.findOne({ id })
    return Promise.resolve(result || null)
  },
}

const Mutation: MutationResolvers = {
  createUser: async (obj, args, { User }): Promise<Maybe<dbUser>> => {
    const result = await User.create(args).save()
    return Promise.resolve(result || null)
  },
  updateUser: async (
    obj,
    { id, firstName, lastName },
    { User },
  ): Promise<Maybe<number>> => {
    const { affected } = await User.update(
      { id },
      { firstName: firstName || undefined, lastName: lastName || undefined },
    )
    return Promise.resolve(affected || null)
  },
  deleteUser: async (obj, { id }, { User }): Promise<Maybe<number>> => {
    const { affected } = await User.delete({ id })
    return Promise.resolve(affected || null)
  },
}

export default {
  Query,
  Mutation,
}
