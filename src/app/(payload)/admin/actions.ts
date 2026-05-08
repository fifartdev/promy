'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import type { ServerFunctionClientArgs } from 'payload'
import { importMap } from './importMap.js'

export async function serverFunction(args: ServerFunctionClientArgs): Promise<unknown> {
  const result = await handleServerFunctions({ ...args, config, importMap })
  if (args.name === 'logout') {
    redirect('/admin')
  }
  return result
}
