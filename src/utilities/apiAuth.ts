/**
 * API Authentication Utilities
 * Validates requests from main website (www.presisikonsulindoprima.com)
 */

/**
 * Validates API key from request headers
 * @param authHeader - Authorization header value (Bearer <token>)
 * @returns boolean - true if valid
 */
export const validateApiKey = (authHeader: string | null): boolean => {
  if (!authHeader) return false

  const token = authHeader.replace('Bearer ', '')
  return token === process.env.API_SECRET
}

/**
 * Validates request origin
 * @param origin - Origin header value
 * @returns boolean - true if allowed
 */
export const validateOrigin = (origin: string | null): boolean => {
  if (!origin) return false

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
  return allowedOrigins.includes(origin)
}

/**
 * Full API request validation
 * @param authHeader - Authorization header
 * @param origin - Origin header
 * @returns { valid: boolean, error?: string }
 */
export const validateApiRequest = (
  authHeader: string | null,
  origin: string | null
): { valid: boolean; error?: string } => {
  // Check origin first
  if (!validateOrigin(origin)) {
    return { valid: false, error: 'Origin not allowed' }
  }

  // Check API key
  if (!validateApiKey(authHeader)) {
    return { valid: false, error: 'Invalid or missing API key' }
  }

  return { valid: true }
}
