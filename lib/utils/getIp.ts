import 'server-only'
import { headers } from 'next/headers'

/**
 * The caller's address. Behind Vercel this arrives as a chain in
 * x-forwarded-for, where the first entry is the original client. Returns null
 * outside a request context rather than throwing.
 */
export async function getIp(): Promise<string | null> {
  try {
    const headerList = await headers()

    return headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? headerList.get('x-real-ip')
  } catch {
    return null
  }
}
