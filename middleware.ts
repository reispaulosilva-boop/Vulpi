import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Assets e API — deixa passar sempre
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Rotas públicas — sem autenticação necessária
  if (
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/paciente')
  ) {
    return NextResponse.next()
  }

  // Demais rotas — exigem autenticação
  const session = request.cookies.get('vulpi_session')

  if (!session || session.value !== 'authenticated') {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
