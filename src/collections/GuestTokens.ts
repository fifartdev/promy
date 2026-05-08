import type { CollectionConfig } from 'payload'

export const GuestTokens: CollectionConfig = {
  slug: 'guest-tokens',
  admin: {
    useAsTitle: 'token',
    description: 'Push notification tokens registered by app users (no account required)',
    defaultColumns: ['token', 'platform', 'createdAt'],
  },
  access: {
    // SuperAdmin can read all tokens for push campaigns
    read: ({ req: { user } }) => user?.role === 'superadmin',
    // Public: mobile app upserts its token on every launch
    create: () => true,
    update: ({ req: { user } }) => user?.role === 'superadmin',
    delete: ({ req: { user } }) => user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Expo Push Notification Token (ExponentPushToken[...])',
      },
    },
    {
      name: 'platform',
      type: 'select',
      options: [
        { label: 'iOS', value: 'ios' },
        { label: 'Android', value: 'android' },
      ],
    },
  ],
  timestamps: true,
}
