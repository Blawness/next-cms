import type { AdminSettings as AdminSettingsType } from '@/payload-types'

// Cache for admin settings to avoid repeated database calls
let settingsCache: AdminSettingsType | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 5000 // 5 seconds cache

/**
 * Get admin settings from the database
 * Uses caching to prevent excessive database calls
 */
export async function getAdminSettings(
  payload: any,
): Promise<AdminSettingsType | null> {
  const now = Date.now()

  // Return cached settings if still valid
  if (settingsCache && now - cacheTimestamp < CACHE_TTL) {
    return settingsCache
  }

  try {
    const settings = await payload.findGlobal({
      slug: 'admin-settings',
    })
    settingsCache = settings as AdminSettingsType
    cacheTimestamp = now
    return settingsCache
  } catch {
    // Settings might not exist yet
    return null
  }
}

/**
 * Check if a feature is enabled in admin settings
 */
export function isFeatureEnabled(
  settings: AdminSettingsType | null,
  feature: 'pages' | 'posts' | 'categories' | 'media',
): boolean {
  if (!settings?.enabledFeatures) return true // Default to enabled
  return settings.enabledFeatures[feature] !== false
}

/**
 * Clear the settings cache (call after settings are updated)
 */
export function clearSettingsCache(): void {
  settingsCache = null
  cacheTimestamp = 0
}
