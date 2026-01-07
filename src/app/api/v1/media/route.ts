/**
 * Secured API Routes for Media
 * URL: /api/v1/media
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateApiRequest } from '@/utilities/apiAuth'
import { getPayload } from 'payload'
import config from '@payload-config'

const checkAuth = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  const origin = request.headers.get('origin')
  return validateApiRequest(authHeader, origin)
}

export async function GET(request: NextRequest) {
  const auth = checkAuth(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const media = await payload.find({
      collection: 'media',
      page,
      limit,
    })

    return NextResponse.json(media, {
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
