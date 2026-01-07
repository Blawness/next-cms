import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'
import { checkRole } from './checkRole'

type IsAdmin = (args: AccessArgs<User>) => boolean

export const isAdmin: IsAdmin = ({ req: { user } }) => {
  return checkRole(user, ['admin'])
}
