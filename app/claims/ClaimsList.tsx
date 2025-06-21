"use client";
import { useEffect, useState } from "react";
import { fetchPostedEvidences } from "@/lib/claims";
import type { PostedEvidence } from "@/lib/types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ClaimsList() {
  const [evidences, setClaims] = useState<(PostedEvidence & { messagedata: any; rawproof: any })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPostedEvidences()
      .then(setClaims)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner text="Loading evidences..." subtext="Fetching your evidence data." />;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ marginTop: 24 }}>
      {evidences.length === 0 ? (
        <div>No evidences found.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Message Data</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Raw Proof</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Wallet ID</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {evidences.map((evidence) => (
              <tr key={evidence.id}>
                <td>
                  <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>{JSON.stringify(evidence.messagedata, null, 2)}</pre>
                </td>
                <td>
                  <a
                    href={`data:application/json,${encodeURIComponent(JSON.stringify(evidence.rawproof, null, 2))}`}
                    download={`rawproof-${evidence.id}.json`}
                    style={{ color: "#0070f3", textDecoration: "underline" }}
                  >
                    Download
                  </a>
                </td>
                <td>{evidence.walletid}</td>
                <td>{evidence.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
