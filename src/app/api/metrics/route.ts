import { NextResponse } from 'next/server'

export async function GET() {
  const metrics = await globalThis?.metrics?.registry.metrics()
  return new NextResponse(metrics, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
