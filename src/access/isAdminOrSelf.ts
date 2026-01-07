import type { Access } from 'payload'
import { checkRole } from './checkRole'

/**
 * Allow admin full access, or allow users to only access their own data
 */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false

  // Admin can access all
  if (checkRole(user, ['admin'])) {
    return true
  }

  // Others can only access their own data
  return {
    id: {
      equals: user.id,
    },
  }
}
