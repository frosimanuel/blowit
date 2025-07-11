"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ReviewEvidence from '@/components/ReviewEvidence';
import Link from 'next/link';
import { fetchEvidenceById } from '@/lib/claims';
import { fetchPostsWithEvidence } from '@/lib/claims';
import LoadingSpinner from '@/components/LoadingSpinner';
import CopyButton from '@/components/CopyButton';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [evidence, setEvidence] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Fetch the post by id
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        if (postError || !postData) throw postError || new Error('Post not found');
        setPost(postData);
        // Fetch the evidence for this post
        const { data: evidenceData, error: evidenceError } = await supabase
          .from('evidences')
          .select('*')
          .eq('evidenceid', postData.evidenceid)
          .single();
        if (evidenceError || !evidenceData) throw evidenceError || new Error('Evidence not found');
        setEvidence(evidenceData);
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <main style={{ padding: 24 }}><LoadingSpinner text="Loading post..." subtext="Fetching post details." /></main>;
  if (error) return <main style={{ padding: 24, color: 'red' }}>Error: {error}</main>;
  if (!post || !evidence) return <main style={{ padding: 24 }}>Not found</main>;

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Link href="/posts" style={{ display: 'inline-block', marginBottom: 16, color: '#0070f3', textDecoration: 'underline' }}>
        ← Back to all posts
      </Link>
      <h1 style={{ marginBottom: 24 }}>Post Details</h1>
      
      {/* Self Verification Badge */}
      {post.self_verified && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '12px 16px', 
          backgroundColor: '#e8f5e8', 
          color: '#2d5a2d', 
          borderRadius: '8px', 
          marginBottom: '24px',
          border: '1px solid #4caf50',
          maxWidth: 'fit-content'
        }}>
          <span>✅</span>
          <span style={{ fontWeight: '500' }}>Identity Verified</span>
          {post.self_verification_timestamp && (
            <span style={{ fontSize: '12px', opacity: 0.8 }}>
              • {new Date(post.self_verification_timestamp).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
      
      <ReviewEvidence
        evidence={{
          from: evidence.messagedata.forward_from?.username || '',
          message: evidence.messagedata.text || '',
          sent: evidence.messagedata.forward_date
            ? new Date(
                typeof evidence.messagedata.forward_date === 'number'
                  ? evidence.messagedata.forward_date * 1000
                  : evidence.messagedata.forward_date
              ).toLocaleString()
            : '',
          context: post.additionalcontext || '',
          publicAddress: '',
          railgunAddress: '',
          proof: evidence.rawproof ? `${JSON.stringify(evidence.rawproof).length / 1024} KB` : '',
        }}
      />
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a
          href={`data:application/json,${encodeURIComponent(JSON.stringify(evidence.rawproof, null, 2))}`}
          download={`rawproof-${evidence.id}.txt`}
          style={{ color: '#0070f3', textDecoration: 'underline' }}
        >
          Download Raw Proof (.txt)
        </a>
      </div>
      <div style={{marginTop: 24}}>
        <strong>Wallet ID for donations:</strong> 
        <CopyButton text={post.walletid} />
      </div>
    </main>
  );
}
