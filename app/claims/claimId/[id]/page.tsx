import { notFound } from 'next/navigation';
import { fetchEvidenceById } from '@/lib/claims';

function formatTimestamp(ts?: number | string) {
  if (!ts) return '';
  const date = typeof ts === 'number' ? new Date(ts * 1000) : new Date(ts);
  return date.toLocaleString();
}

export default async function ClaimIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Fetch the evidence by evidenceid directly from Supabase
  const evidence = await fetchEvidenceById(id);
  if (!evidence) return notFound();

  // Extract fields from messagedata
  const md = evidence.messagedata;
  const forwardedFrom = md?.forward_from
    ? `${md.forward_from.first_name || ''} ${md.forward_from.last_name || ''} (@${md.forward_from.username || ''})`.trim()
    : 'Unknown';
  const text = md?.text || '';
  const sentDate = md?.forward_date || md?.date || evidence.createdAt;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', border: '1px solid #eee', borderRadius: 8, padding: 32, background: '#fff' }}>
      <h2 style={{ marginBottom: 24 }}>Evidence Details</h2>
      <div style={{ marginBottom: 18 }}>
        <strong>From:</strong> {forwardedFrom}
      </div>
      <div style={{ marginBottom: 18 }}>
        <strong>Message:</strong> {text}
      </div>
      <div style={{ marginBottom: 18 }}>
        <strong>Sent:</strong> {formatTimestamp(sentDate)}
      </div>

      <div style={{ marginBottom: 18 }}>
        <strong>Evidence ID:</strong> {evidence.id}
      </div>

      <div>
        <strong>Raw Proof:</strong>
        <a
          href={`data:application/json,${encodeURIComponent(JSON.stringify(evidence.rawproof, null, 2))}`}
          download={`rawproof-${evidence.id}.txt`}
          style={{ color: '#0070f3', textDecoration: 'underline', marginLeft: 8 }}
        >
          Download
        </a>
      </div>
    </div>
  );
}
