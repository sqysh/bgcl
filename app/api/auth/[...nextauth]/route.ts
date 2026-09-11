import { handlers } from '@/lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const GET = handlers.GET

export async function POST(request: NextRequest) {
  // Sign-in requests must go through requestMagicLink, which verifies Turnstile
  // first. NextAuth creates the user before the provider runs, so a direct POST
  // here bypasses every check.
  if (request.nextUrl.pathname.endsWith('/signin/email')) {
    return new NextResponse(null, { status: 404 })
  }

  return handlers.POST(request)
}
