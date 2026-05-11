import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar;
    DROP INDEX IF EXISTS "media_filename_idx";
    CREATE UNIQUE INDEX "media_filename_prefix_idx" ON "media" USING btree ("filename", "prefix");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "media_filename_prefix_idx";
    CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
    ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";
  `)
}
