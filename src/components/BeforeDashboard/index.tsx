import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>👋 Selamat Datang di PKP Content Studio</h4>
      </Banner>
      
      <div className={`${baseClass}__cards`}>
        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-icon`}>📝</div>
          <h5>Posts</h5>
          <p>Kelola artikel dan konten blog</p>
          <a href="/admin/collections/posts">Lihat Posts →</a>
        </div>
        
        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-icon`}>🖼️</div>
          <h5>Media</h5>
          <p>Upload gambar dan file</p>
          <a href="/admin/collections/media">Lihat Media →</a>
        </div>
        
        <div className={`${baseClass}__card`}>
          <div className={`${baseClass}__card-icon`}>📁</div>
          <h5>Categories</h5>
          <p>Organisasi konten</p>
          <a href="/admin/collections/categories">Lihat Categories →</a>
        </div>
      </div>

      <div className={`${baseClass}__tip`}>
        <strong>💡 Quick Tip:</strong> Gunakan menu di sidebar untuk navigasi ke semua collection.
      </div>
    </div>
  )
}

export default BeforeDashboard
