import {
  QueryResolvers,
  Maybe,
  MutationResolvers,
  AccomplishmentResolvers,
  UserResolvers,
} from '../typings/graphql'
import { User as dbUser } from '../db/entity/User'
import { Accomplishment as dbAccomplishment } from '../db/entity/Accomplishment'

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

  createAccomplishment: async (
    obj,
    { userId, text },
    { Accomplishment },
  ): Promise<Maybe<dbAccomplishment>> =>
    (await Accomplishment.create({ userId, text }).save()) || null,
}

const Accomplishment: AccomplishmentResolvers = {
  user: async (parent, args, ctx): Promise<dbUser> =>
    ctx.User.findOneOrFail({ id: parent.userId }),
}

const User: UserResolvers = {
  accomplishments: async (parent, _, ctx): Promise<Maybe<dbAccomplishment[]>> =>
    ctx.Accomplishment.find({ userId: parent.id }),
}

export default {
  Query,
  Mutation,
  User,
  Accomplishment,
}
