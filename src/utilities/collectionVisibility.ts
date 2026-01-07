import type { CollectionConfig } from 'payload'

type HideableCollection = 'pages' | 'posts' | 'categories' | 'media'

/**
 * Creates a hidden function for a collection based on admin settings.
 * 
 * Note: Since Payload's hidden function doesn't have direct access to the database,
 * we use environment variables or runtime checks. For a fully dynamic solution,
 * the admin will need to restart the server after changing settings.
 * 
 * For now, we provide a simple implementation that can be extended.
 */
export function createHiddenFunction(
  collectionSlug: HideableCollection,
): CollectionConfig['admin'] extends { hidden?: infer H } ? H : never {
  return async ({ user }) => {
    // If no user (not logged in), don't hide
    if (!user) return false

    // Dynamic check - will be implemented via API call
    // For now, return false (never hidden) - the setting will work via the dashboard
    return false
  }
}

/**
 * Environment variable-based collection visibility
 * Set HIDE_PAGES=true, HIDE_POSTS=true, etc. to hide collections
 */
export function isCollectionHiddenByEnv(slug: HideableCollection): boolean {
  const envKey = `HIDE_${slug.toUpperCase()}`
  return process.env[envKey] === 'true'
}
