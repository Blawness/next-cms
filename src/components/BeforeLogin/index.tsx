import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div className="before-login">
      <div className="before-login__logo">
        <span className="before-login__logo-icon">📝</span>
      </div>
      <h2 className="before-login__title">PKP Content Studio</h2>
      <p className="before-login__subtitle">
        Presisi Konsulindo Prima CMS
      </p>
      <div className="before-login__divider" />
      <p className="before-login__description">
        Kelola konten artikel untuk website dengan mudah dan efisien.
      </p>
    </div>
  )
}

export default BeforeLogin
