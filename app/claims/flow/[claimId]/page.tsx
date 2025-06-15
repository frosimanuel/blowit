'use client';
import React, { useState } from 'react';
import EvidenceForm from '@/components/EvidenceForm';
import SeedPhraseDisplay from '@/components/SeedPhraseDisplay';
import SeedPhraseConfirm from '@/components/SeedPhraseConfirm';
import ReviewEvidence from '@/components/ReviewEvidence';
import PublishSuccess from '@/components/PublishSuccess';
import MobileFrame from '@/components/MobileFrame';
import { StoredClaim } from '@/lib/types';

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

interface FlowPageProps {
  params: { claimId: string };
}

export default function FlowPage({ params }: FlowPageProps) {
  const { claimId } = params;
  // In a real app, fetch claim from API/DB
  const claim = claimId === 'test-claim' ? MOCK_CLAIM : null;
  const [step, setStep] = useState(0);
  const [context, setContext] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [addresses, setAddresses] = useState({ publicAddress: '', railgunAddress: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvidenceNext = async (ctx: string) => {
    setContext(ctx);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://railgun-server.onrender.com/wallet/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'nopasswordneeded' })
      });
      if (!response.ok) throw new Error('Failed to create wallet');
      const data = await response.json();
      setMnemonic(data.mnemonic);
      setAddresses({
        publicAddress: data.publicAddress,
        railgunAddress: data.railgunWalletAddress
      });
      setStep(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!claim) return <div>Claim not found.</div>;
  if (loading) return <MobileFrame><div>Loading…</div></MobileFrame>;
  if (error) return <MobileFrame><div style={{ color: 'red' }}>Error: {error}</div></MobileFrame>;

  return (
    <MobileFrame>
      {step === 0 && (
        <EvidenceForm onNext={handleEvidenceNext} />
      )}
      {step === 1 && (
        <SeedPhraseDisplay mnemonic={mnemonic} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <SeedPhraseConfirm mnemonic={mnemonic} onConfirm={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && (
        <ReviewEvidence
          evidence={{
            from: claim.messageData.from,
            message: claim.messageData.message,
            sent: claim.messageData.sent,
            context,
            publicAddress: addresses.publicAddress,
            railgunAddress: addresses.railgunAddress,
            proof: '24KBs on June 14th at 5:43 PM'
          }}
          onPublish={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <PublishSuccess
          evidence={{
            from: claim.messageData.from,
            message: claim.messageData.message,
            sent: claim.messageData.sent,
            context
          }}
        />
      )}
    </MobileFrame>
  );
} 