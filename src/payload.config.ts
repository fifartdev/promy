import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Businesses } from './collections/Businesses'
import { BusinessCategories } from './collections/BusinessCategories'
import { GuestTokens } from './collections/GuestTokens'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Promy CMS',
    },
  },

  collections: [Users, Businesses, BusinessCategories, GuestTokens, Media],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  upload: {
    limits: {
      fileSize: 5_000_000, // 5 MB
    },
  },

  // Vercel Blob storage — active when BLOB_READ_WRITE_TOKEN is set (production).
  // Falls back to local staticDir in development when the token is absent.
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: {
          prefix: 'promy-media',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],

  // Allow requests from the Expo app (LAN in dev, Vercel URL in prod)
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  routes: {
    api: '/api',
    admin: '/admin',
  },
})
