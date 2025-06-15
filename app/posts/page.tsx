'use client';
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPostsWithEvidence } from '@/lib/claims';

interface PostOverview {
  id: string;
  username: string;
  text: string;
  additionalcontext: string;
  created_at: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPostsWithEvidence();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <main style={{ padding: 24 }}>Loading posts…</main>;
  if (error) return <main style={{ padding: 24, color: 'red' }}>{error}</main>;

  return (
    <main style={{ padding: 24, maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>All Posts</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Username</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Message</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Additional Context</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <Link key={post.id} href={`/posts/${post.id}`} legacyBehavior>
              <tr style={{ borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                <td style={{ padding: 8 }}>{post.username}</td>
                <td style={{ padding: 8 }}>{post.text}</td>
                <td style={{ padding: 8 }}>{post.additionalcontext}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </main>
  );
}
