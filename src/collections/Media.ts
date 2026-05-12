import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => user?.role === 'superadmin',
    delete: ({ req: { user } }) => user?.role === 'superadmin',
  },
  upload: {
    // process.cwd() always resolves to the project root regardless of how
    // Next.js compiles and runs the file, avoiding import.meta.url path drift.
    staticDir: path.resolve(process.cwd(), 'public/media'),
    staticURL: '/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
