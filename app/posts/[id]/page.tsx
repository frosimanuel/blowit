"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ReviewEvidence from '@/components/ReviewEvidence';
import Link from 'next/link';

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

  if (loading) return <main style={{ padding: 24 }}>Loading…</main>;
  if (error) return <main style={{ padding: 24, color: 'red' }}>{error}</main>;
  if (!post || !evidence) return <main style={{ padding: 24 }}>Not found</main>;

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Link href="/posts" style={{ display: 'inline-block', marginBottom: 16, color: '#0070f3', textDecoration: 'underline' }}>
        ← Back to all posts
      </Link>
      <h1 style={{ marginBottom: 24 }}>Post Details</h1>
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
      <div style={{marginTop: 24}}>
        <strong>Wallet ID for donations:</strong> {post.walletid}
      </div>
    </main>
  );
}
