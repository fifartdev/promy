import type { CollectionConfig } from 'payload'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export const BusinessCategories: CollectionConfig = {
  slug: 'business-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'superadmin',
    update: ({ req: { user } }) => user?.role === 'superadmin',
    delete: ({ req: { user } }) => user?.role === 'superadmin',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.title && !data.slug) {
          data.slug = toSlug(data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated from title on first save',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
