/**
 * Collection visibility based on environment variables
 * 
 * Since Payload's admin.hidden function doesn't support async operations,
 * we use environment variables for static configuration.
 * 
 * Set these environment variables to hide collections:
 * - HIDE_PAGES=true
 * - HIDE_POSTS=true
 * - HIDE_CATEGORIES=true
 * - HIDE_MEDIA=true
 * 
 * For dynamic visibility based on AdminSettings, you'll need to:
 * 1. Update AdminSettings in the admin panel
 * 2. Set corresponding environment variables
 * 3. Restart the server
 * 
 * Alternatively, the BeforeDashboard component dynamically shows/hides
 * collection quick links based on the AdminSettings.
 */

type HideableCollection = 'pages' | 'posts' | 'categories' | 'media'

/**
 * Check if a collection should be hidden based on environment variable
 */
export function isCollectionHidden(slug: HideableCollection): boolean {
  const envKey = `HIDE_${slug.toUpperCase()}`
  return process.env[envKey] === 'true'
}

/**
 * Creates a hidden value/function for a collection based on environment variables
 * Returns true if the collection should be hidden
 */
export function createCollectionHiddenFn(
  collectionSlug: HideableCollection,
): boolean {
  return isCollectionHidden(collectionSlug)
}
