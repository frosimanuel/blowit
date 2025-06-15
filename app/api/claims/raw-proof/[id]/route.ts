import { NextResponse } from 'next/server';
import path from 'path';

// Import the in-memory db from the parent claims route
import { db } from '../../route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const claim = db[id];
  if (!claim) {
    return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
  }

  return new Response(JSON.stringify(claim.rawProof, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename=rawProof-${id}.json`,
    },
  });
}
