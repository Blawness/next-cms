import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { slugField } from 'payload'
import { createCollectionHiddenFn } from '../utilities/collectionVisibility'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: anyone,
    update: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    hidden: createCollectionHiddenFn('categories'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
