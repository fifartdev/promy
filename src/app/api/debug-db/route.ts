import { NextResponse } from 'next/server'
import { Pool } from 'pg'

export const dynamic = 'force-dynamic'

export async function GET() {
  const uri = process.env.DATABASE_URI
  if (!uri) return NextResponse.json({ error: 'DATABASE_URI not set' }, { status: 500 })

  const host = uri.split('@')[1]?.split('/')[0] ?? 'unknown'
  const database = uri.split('/').pop()?.split('?')[0] ?? 'unknown'

  try {
    const pool = new Pool({ connectionString: uri })
    const result = await pool.query(
      `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public' ORDER BY tablename`,
    )
    await pool.end()
    return NextResponse.json({ host, database, tables: result.rows.map((r) => r.tablename) })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ host, database, error: message }, { status: 500 })
  }
}
