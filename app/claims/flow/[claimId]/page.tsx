'use client';
"use client";
import React, { useState } from 'react';

function formatTimestamp(ts?: number | string) {
  if (!ts) return '';
  const date = typeof ts === 'number' ? new Date(ts * 1000) : new Date(ts);
  return date.toLocaleString();
}

import EvidenceForm from '@/components/EvidenceForm';
import SeedPhraseDisplay from '@/components/SeedPhraseDisplay';
import SeedPhraseConfirm from '@/components/SeedPhraseConfirm';
import ReviewEvidence from '@/components/ReviewEvidence';
import PublishSuccess from '@/components/PublishSuccess';
import MobileFrame from '@/components/MobileFrame';
import { StoredClaim } from '@/lib/types';

// Mocked claim for testing
import { fetchEvidenceById } from '@/lib/claims';
import { createPost } from '@/lib/claims';

interface FlowPageProps {
  params: Promise<{ claimId: string }>;
}

export default function FlowPage({ params }: FlowPageProps) {
  const [claim, setClaim] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [context, setContext] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [addresses, setAddresses] = useState({ publicAddress: '', railgunAddress: '' });
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const { claimId } = await params;
        const evidence = await fetchEvidenceById(claimId);
        setClaim(evidence);
      } catch (err: any) {
        setError(err.message || 'Failed to load evidence');
      } finally {
        setLoading(false);
      }
    })();
  }, [params]);


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

  // Handler to publish evidence as a post
  const handlePublishEvidence = async () => {
    setPublishing(true);
    setPublishError(null);
    try {
      // Use evidenceid and walletid (railgunAddress)
      await createPost(claim.evidenceid, addresses.railgunAddress);
      setStep(4);
    } catch (err: any) {
      setPublishError(err.message || 'Failed to publish evidence');
    } finally {
      setPublishing(false);
    }
  };

  if (!claim) return <div>Claim not found.</div>;
  if (loading) return <MobileFrame><div>Loading…</div></MobileFrame>;
  if (error) return <MobileFrame><div style={{ color: 'red' }}>Error: {error}</div></MobileFrame>;
  if (publishing) return <MobileFrame><div>Publishing evidence…</div></MobileFrame>;
  if (publishError) return <MobileFrame><div style={{ color: 'red' }}>Publish failed: {publishError}</div></MobileFrame>;

  return (
    <MobileFrame>
      {step === 0 && claim && (
        <EvidenceForm 
          onNext={handleEvidenceNext} 
          evidence={{
            from: claim.messagedata.forward_from?.username,
            message: claim.messagedata.text,
            sent: claim.messagedata.forward_date? formatTimestamp(claim.messagedata.forward_date): ""
          }}
        /> 
      )}
      {step === 1 && (
        <SeedPhraseDisplay mnemonic={mnemonic} onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <SeedPhraseConfirm mnemonic={mnemonic} onConfirm={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && (
        <>
          <ReviewEvidence
            evidence={{
              from: claim.messagedata.forward_from?.username,
              message: claim.messagedata.text,
              sent: claim.messagedata.forward_date? formatTimestamp(claim.messagedata.forward_date): "",
              context,
              publicAddress: addresses.publicAddress,
              railgunAddress: addresses.railgunAddress,
              proof: '24KBs on June 14th at 5:43 PM'
            }}
            onPublish={handlePublishEvidence}
          />
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <a
              href={`data:application/json,${encodeURIComponent(JSON.stringify(claim.rawproof, null, 2))}`}
              download={`rawproof-${claim.id}.txt`}
              style={{ color: '#0070f3', textDecoration: 'underline' }}
            >
              Download Raw Proof (.txt)
            </a>
          </div>
        </>
      )}
      {step === 4 && (
        <PublishSuccess
          evidence={{
            from: claim.messagedata.forward_from?.username,
            message: claim.messagedata.text,
            sent: claim.messagedata.forward_date ? formatTimestamp(claim.messagedata.forward_date) : "",
            context,
            publicAddress: addresses.publicAddress,
            railgunAddress: addresses.railgunAddress,
            proof: '24KBs on June 14th at 5:43 PM',
            rawproof: claim.rawproof,
            id: claim.id
          }}
        />
      )}
    </MobileFrame>
  );
} 