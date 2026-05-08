import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'business'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superadmin') return true
      return { id: { equals: user.id } }
    },
    create: ({ req: { user } }) => user?.role === 'superadmin',
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superadmin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'business-admin',
      saveToJWT: true,
      options: [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Business Admin', value: 'business-admin' },
      ],
    },
    {
      name: 'business',
      type: 'relationship',
      relationTo: 'businesses',
      saveToJWT: true,
      admin: {
        condition: (data) => data.role === 'business-admin',
        description: 'The business this admin manages (Business Admin only)',
      },
    },
  ],
}
