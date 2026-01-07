import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'
import { checkRole } from './checkRole'

type IsAdminEditorOrAuthor = (args: AccessArgs<User>) => boolean

export const isAdminEditorOrAuthor: IsAdminEditorOrAuthor = ({ req: { user } }) => {
  return checkRole(user, ['admin', 'editor', 'author'])
}
