'use client'

import { Banner } from '@payloadcms/ui/elements/Banner'
import React, { useEffect, useState } from 'react'

const baseClass = 'before-dashboard'

interface AdminSettings {
  enabledFeatures?: {
    pages?: boolean | null
    posts?: boolean | null
    categories?: boolean | null
    media?: boolean | null
  }
  branding?: {
    siteName?: string | null
    adminDescription?: string | null
  }
  dashboard?: {
    showWelcome?: boolean | null
    welcomeTitle?: string | null
    welcomeMessage?: string | null
  }
}

interface QuickLinkCard {
  slug: 'pages' | 'posts' | 'categories' | 'media'
  icon: string
  title: string
  description: string
}

const collectionCards: QuickLinkCard[] = [
  {
    slug: 'pages',
    icon: '📄',
    title: 'Pages',
    description: 'Kelola halaman website',
  },
  {
    slug: 'posts',
    icon: '📝',
    title: 'Posts',
    description: 'Kelola artikel dan konten blog',
  },
  {
    slug: 'media',
    icon: '🖼️',
    title: 'Media',
    description: 'Upload gambar dan file',
  },
  {
    slug: 'categories',
    icon: '📁',
    title: 'Categories',
    description: 'Organisasi konten',
  },
]

const BeforeDashboard: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch admin settings from API
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/globals/admin-settings')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error('Failed to fetch admin settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // Filter cards based on enabled features from settings
  const visibleCards = collectionCards.filter((card) => {
    if (!settings?.enabledFeatures) return true // Show all if no settings
    const isEnabled = settings.enabledFeatures[card.slug]
    return isEnabled !== false // Show if true or null/undefined
  })

  // Get custom content from settings
  const welcomeTitle = settings?.dashboard?.welcomeTitle || 'Selamat Datang di CMS Admin'
  const welcomeMessage = settings?.dashboard?.welcomeMessage
  const showWelcome = settings?.dashboard?.showWelcome !== false

  if (loading) {
    return (
      <div className={baseClass}>
        <Banner className={`${baseClass}__banner`} type="default">
          <h4>⏳ Loading dashboard...</h4>
        </Banner>
      </div>
    )
  }

  return (
    <div className={baseClass}>
      {showWelcome && (
        <Banner className={`${baseClass}__banner`} type="success">
          <h4>👋 {welcomeTitle}</h4>
          {welcomeMessage && <p style={{ margin: '8px 0 0 0' }}>{welcomeMessage}</p>}
        </Banner>
      )}

      <div className={`${baseClass}__cards`}>
        {visibleCards.map((card) => (
          <div key={card.slug} className={`${baseClass}__card`}>
            <div className={`${baseClass}__card-icon`}>{card.icon}</div>
            <h5>{card.title}</h5>
            <p>{card.description}</p>
            <a href={`/admin/collections/${card.slug}`}>Lihat {card.title} →</a>
          </div>
        ))}
      </div>

      {visibleCards.length === 0 && (
        <div className={`${baseClass}__tip`}>
          <strong>ℹ️ Info:</strong> Tidak ada collection yang diaktifkan. Pergi ke{' '}
          <a href="/admin/globals/admin-settings">Admin Settings</a> untuk mengaktifkan fitur.
        </div>
      )}

      <div className={`${baseClass}__tip`}>
        <strong>⚙️ Admin Settings:</strong> Gunakan menu{' '}
        <a href="/admin/globals/admin-settings">Admin Settings</a> untuk mengkustomisasi tampilan
        admin panel.
      </div>
    </div>
  )
}

export default BeforeDashboard
