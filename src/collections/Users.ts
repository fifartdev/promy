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
      if (user.role === 'superadmin' || user.role === 'business-admin') return true
      return { id: { equals: user.id } }
    },
    create: ({ req: { user } }) => user?.role === 'superadmin',
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superadmin' || user.role === 'business-admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'superadmin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'business-manager',
      saveToJWT: true,
      options: [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Business Admin', value: 'business-admin' },
        { label: 'Business Manager', value: 'business-manager' },
      ],
    },
    {
      name: 'business',
      type: 'relationship',
      relationTo: 'businesses',
      saveToJWT: true,
      admin: {
        condition: (data) =>
          data.role === 'business-admin' || data.role === 'business-manager',
        description: 'The business this user manages',
      },
    },
  ],
}
