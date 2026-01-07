'use client'

import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import { useConfig } from '@payloadcms/ui'

const baseClass = 'before-dashboard'

interface QuickLinkCard {
  slug: string
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
  const { config } = useConfig()
  const collections = config?.collections || []

  // Filter cards to only show collections that exist in config
  const visibleCards = collectionCards.filter((card) =>
    collections.some((col) => col.slug === card.slug),
  )

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>👋 Selamat Datang di CMS Admin</h4>
      </Banner>

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

      <div className={`${baseClass}__tip`}>
        <strong>⚙️ Admin Settings:</strong> Gunakan menu{' '}
        <a href="/admin/globals/admin-settings">Admin Settings</a> untuk mengkustomisasi tampilan
        admin panel.
      </div>
    </div>
  )
}

export default BeforeDashboard
