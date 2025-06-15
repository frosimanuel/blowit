import { StoredClaim } from '@/lib/types';

interface ClaimPageProps {
  params: { claimId: string };
}

// Mocked claim for testing
const MOCK_CLAIM: StoredClaim = {
  id: 'test-claim',
  messageData: {
    from: 'Andreas (@archive_eth)',
    message: 'you keep getting logged out from ddocs every 15mins',
    sent: 'Sent on June 14th at 2:01 AM'
  },
  rawProof: {},
  processedProof: {
    sender: 'Andreas (@archive_eth)',
    text: 'you keep getting logged out from ddocs every 15mins',
    timestamp: 1718320860
  },
  createdAt: new Date().toISOString()
};

async function fetchClaim(claimId: string): Promise<StoredClaim | null> {
  if (claimId === 'test-claim') return MOCK_CLAIM;
  return null;
}

export default async function ClaimPage({ params }: ClaimPageProps) {
  const claim = await fetchClaim(params.claimId);

  if (!claim) {
    return <div>Claim not found.</div>;
  }

  // Render your React flow here, using claim
  return (
    <div>
      <h1>Claim Page for ID: {params.claimId}</h1>
      <pre>{JSON.stringify(claim, null, 2)}</pre>
      {/* Replace above with your onboarding/evidence flow */}
    </div>
  );
} 