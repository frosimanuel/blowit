import { StoredClaim, ClaimPayload } from '@/lib/types';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Mock DB (in-memory for now)
const db: Record<string, StoredClaim> = {};

export async function POST(request: Request) {
  const body: ClaimPayload = await request.json();

  const claimId = crypto.randomUUID();

  const dataToStore: StoredClaim = {
    id: claimId,
    ...body,
    createdAt: new Date().toISOString(),
  };

  db[claimId] = dataToStore;

  return NextResponse.json({ success: true, claimId });
} 