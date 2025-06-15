import { PostedClaim, ClaimPayload } from '@/lib/types';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Mock DB (in-memory for now)
const db: Record<string, any> = {};

export async function POST(request: Request) {
  const body: ClaimPayload = await request.json();

  const claimId = crypto.randomUUID();

  // Simulate walletId and claimId for demo
  const walletId = body.messagedata?.forward_from?.username || 'unknown-wallet';

  const dataToStore = {
    id: claimId,
    claimId: claimId,
    walletId,
    createdAt: new Date().toISOString(),
    ...body
  };

  db[claimId] = dataToStore;

  return NextResponse.json({ success: true, claimId });
}

export async function GET() {
  // Return all claims as an array
  return NextResponse.json(Object.values(db));
}