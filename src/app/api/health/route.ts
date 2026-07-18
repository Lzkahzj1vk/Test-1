export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET() {
  try {
    return Response.json({ ok: true, status: 'healthy' }, { status: 200 });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
