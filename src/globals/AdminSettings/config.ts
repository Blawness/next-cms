import type { GlobalConfig } from 'payload'
import { isAdmin } from '../../access/isAdmin'

export const AdminSettings: GlobalConfig = {
  slug: 'admin-settings',
  label: 'Admin Settings',
  access: {
    read: () => true, // Everyone can read settings to determine visibility
    update: isAdmin, // Only admin can update
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'enabledFeatures',
      type: 'group',
      label: 'Enabled Features',
      admin: {
        description: 'Toggle visibility of collections in admin panel',
      },
      fields: [
        {
          name: 'pages',
          type: 'checkbox',
          label: 'Pages',
          defaultValue: true,
          admin: {
            description: 'Show Pages collection in sidebar',
          },
        },
        {
          name: 'posts',
          type: 'checkbox',
          label: 'Posts',
          defaultValue: true,
          admin: {
            description: 'Show Posts collection in sidebar',
          },
        },
        {
          name: 'categories',
          type: 'checkbox',
          label: 'Categories',
          defaultValue: true,
          admin: {
            description: 'Show Categories collection in sidebar',
          },
        },
        {
          name: 'media',
          type: 'checkbox',
          label: 'Media',
          defaultValue: true,
          admin: {
            description: 'Show Media collection in sidebar',
          },
        },
      ],
    },
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: 'Site Name',
          defaultValue: 'My CMS',
          admin: {
            description: 'Name displayed in admin panel meta title',
          },
        },
        {
          name: 'adminDescription',
          type: 'textarea',
          label: 'Admin Description',
          admin: {
            description: 'Description shown on dashboard',
          },
        },
      ],
    },
    {
      name: 'dashboard',
      type: 'group',
      label: 'Dashboard',
      fields: [
        {
          name: 'showWelcome',
          type: 'checkbox',
          label: 'Show Welcome Message',
          defaultValue: true,
        },
        {
          name: 'welcomeTitle',
          type: 'text',
          label: 'Welcome Title',
          defaultValue: 'Welcome to your CMS',
        },
        {
          name: 'welcomeMessage',
          type: 'textarea',
          label: 'Welcome Message',
          defaultValue: 'Manage your content from here.',
        },
      ],
    },
  ],
}
