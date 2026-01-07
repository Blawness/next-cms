import type { User } from '@/payload-types'

export type Role = 'admin' | 'editor' | 'author' | 'viewer'

/**
 * Check if user has one of the allowed roles
 */
export const checkRole = (
  user: User | null | undefined,
  allowedRoles: Role[],
): boolean => {
  if (!user) return false
  const userRole = (user.role as Role) || 'viewer'
  return allowedRoles.includes(userRole)
}
