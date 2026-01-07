import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'
import { checkRole } from './checkRole'

type IsAdminOrEditor = (args: AccessArgs<User>) => boolean

export const isAdminOrEditor: IsAdminOrEditor = ({ req: { user } }) => {
  return checkRole(user, ['admin', 'editor'])
}
