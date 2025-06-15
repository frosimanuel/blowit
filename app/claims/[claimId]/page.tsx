import MobileFrame from '@/components/MobileFrame';
import { StoredClaim } from '@/lib/types';
import { useParams } from "next/navigation";
import React from "react";

// Mocked claim for testing (in a real app, fetch from DB)
const MOCK_CLAIM: StoredClaim = {
  id: 'test-claim',
  messageData: { from: 'Andreas (@archive_eth)', message: 'you keep getting logged out from ddocs every 15mins', sent: 'Sent on June 14th at 2:01 AM' },
  rawProof: {},
  processedProof: { sender: 'Andreas (@archive_eth)', text: 'you keep getting logged out from ddocs every 15mins', timestamp: 1718320860 },
  createdAt: new Date().toISOString()
};

export default function Page({ params }: { params: { claimId: string } }) {
  const { claimId } = params;
  const claim = claimId === 'test-claim' ? MOCK_CLAIM : null;

  if (!claim) return <MobileFrame><div>Claim not found.</div></MobileFrame>;

  return (
    <MobileFrame>
      <h1>Claim: {claim.id}</h1>
      <p>From: {claim.messageData.from}</p>
      <p>Message: {claim.messageData.message}</p>
      <p>Sent: {claim.messageData.sent}</p>
    </MobileFrame>
  );
} 