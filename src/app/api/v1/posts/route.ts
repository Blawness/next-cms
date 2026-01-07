/**
 * Secured API Routes for Main Website
 * These endpoints require API_SECRET authentication
 * URL: /api/v1/posts, /api/v1/pages, etc.
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateApiRequest } from '@/utilities/apiAuth'
import { getPayload } from 'payload'
import config from '@payload-config'

// Helper to check auth
const checkAuth = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  const origin = request.headers.get('origin')
  return validateApiRequest(authHeader, origin)
}

// GET /api/v1/posts
export async function GET(request: NextRequest) {
  // Validate auth
  const auth = checkAuth(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const depth = parseInt(searchParams.get('depth') || '1')

    const posts = await payload.find({
      collection: 'posts',
      page,
      limit,
      depth,
      where: {
        _status: { equals: 'published' },
      },
    })

    return NextResponse.json(posts, {
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

// Preflight
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
