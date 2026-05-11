import type { CollectionConfig } from 'payload'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export const Businesses: CollectionConfig = {
  slug: 'businesses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'category'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'superadmin',
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superadmin') return true
      if (user.role === 'business-admin') return true
      return false
    },
    delete: ({ req: { user } }) => user?.role === 'superadmin',
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation, originalDoc }) => {
        // Normalize comma decimal separators (e.g. Greek locale: "37,946" → 37.946)
        if (data.location) {
          const coord = (val: unknown): number | undefined => {
            if (typeof val === 'number' && !isNaN(val)) return val
            if (typeof val === 'string') {
              const parsed = parseFloat(val.replace(',', '.'))
              return isNaN(parsed) ? undefined : parsed
            }
            return undefined
          }
          if (data.location.latitude !== undefined) data.location.latitude = coord(data.location.latitude)
          if (data.location.longitude !== undefined) data.location.longitude = coord(data.location.longitude)
        }

        // Auto-generate slug on create
        if (operation === 'create' && data.name && !data.slug) {
          data.slug = toSlug(data.name)
        }

        // Business admins can only update promo fields on their own business
        if (req.user?.role === 'business-admin' && operation === 'update') {
          const userBusinessId =
            typeof req.user.business === 'object'
              ? (req.user.business as { id: string })?.id
              : req.user.business

          if (userBusinessId !== originalDoc?.id) {
            throw new Error('Unauthorized: you can only update your own business')
          }

          // Merge promo onto the existing document so required fields stay intact
          return { ...originalDoc, promo: data.promo }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated from name on create',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'fullDescription',
      type: 'richText',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in the Featured carousel on the mobile app',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'business-categories',
    },

    // ── Contact ────────────────────────────────────────────────────────────────
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'websiteUrl',
          label: 'Website URL',
          type: 'text',
        },
        {
          name: 'socials',
          type: 'group',
          fields: [
            { name: 'instagram', type: 'text' },
            { name: 'facebook', type: 'text' },
            { name: 'linkedin', type: 'text' },
            { name: 'tiktok', type: 'text' },
          ],
        },
      ],
    },

    // ── Location ───────────────────────────────────────────────────────────────
    {
      name: 'location',
      type: 'group',
      admin: {
        description: 'Used by the mobile app to create a 25-meter geofence',
      },
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
          admin: { step: 0.000001 },
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
          admin: { step: 0.000001 },
        },
      ],
    },

    // ── Promo ──────────────────────────────────────────────────────────────────
    {
      name: 'promo',
      type: 'group',
      admin: {
        description: 'Business Admins can only edit fields in this section',
      },
      fields: [
        {
          name: 'promoImage',
          label: 'Promo Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'promoTitle',
          label: 'Promo Title',
          type: 'text',
        },
        {
          name: 'promoDescription',
          label: 'Promo Description',
          type: 'textarea',
        },
        {
          name: 'ctaUrl',
          label: 'CTA URL',
          type: 'text',
          admin: {
            description: 'Link opened when user taps "Claim Offer" on the app',
          },
        },
      ],
    },
  ],
}
