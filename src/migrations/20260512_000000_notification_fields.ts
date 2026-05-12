import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Notification asset columns on businesses
    ALTER TABLE "businesses"
      ADD COLUMN IF NOT EXISTS "notification_notification_icon_id" integer,
      ADD COLUMN IF NOT EXISTS "notification_notification_banner_id" integer;

    ALTER TABLE "businesses"
      ADD CONSTRAINT "businesses_notification_notification_icon_id_media_id_fk"
        FOREIGN KEY ("notification_notification_icon_id")
        REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action,
      ADD CONSTRAINT "businesses_notification_notification_banner_id_media_id_fk"
        FOREIGN KEY ("notification_notification_banner_id")
        REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "businesses_notification_notification_icon_idx"
      ON "businesses" USING btree ("notification_notification_icon_id");
    CREATE INDEX IF NOT EXISTS "businesses_notification_notification_banner_idx"
      ON "businesses" USING btree ("notification_notification_banner_id");

    -- business-manager role
    ALTER TYPE "public"."enum_users_role" ADD VALUE IF NOT EXISTS 'business-manager';

    -- make media.alt nullable (was NOT NULL in initial schema)
    ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "businesses_notification_notification_banner_idx";
    DROP INDEX IF EXISTS "businesses_notification_notification_icon_idx";

    ALTER TABLE "businesses"
      DROP CONSTRAINT IF EXISTS "businesses_notification_notification_banner_id_media_id_fk",
      DROP CONSTRAINT IF EXISTS "businesses_notification_notification_icon_id_media_id_fk",
      DROP COLUMN IF EXISTS "notification_notification_banner_id",
      DROP COLUMN IF EXISTS "notification_notification_icon_id";

    ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  `)
}
