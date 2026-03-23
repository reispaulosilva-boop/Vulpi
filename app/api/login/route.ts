import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (username === 'Crepaldi' && password === '@Crepaldi2026') {
    const response = NextResponse.json({ success: true })
    response.cookies.set('vulpi_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400 * 7,
      path: '/',
      sameSite: 'lax',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
