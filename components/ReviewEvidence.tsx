'use client';
import React from 'react';
import styles from './ReviewEvidence.module.css';

interface ReviewEvidenceProps {
  evidence: {
    from: string;
    message: string;
    sent: string;
    context: string;
    publicAddress: string;
    railgunAddress: string;
    proof: string;
    rawproof?: any;
    id?: string;
  };
  onPublish?: () => void;
  selfVerified?: boolean;
}

export default function ReviewEvidence({ evidence, onPublish, selfVerified }: ReviewEvidenceProps) {
  return (
    <div className={styles.container}>
      {onPublish && (
              <h2 className={styles.heading}>
              Review your evidence
            </h2>
        )
      }
      
      {/* Self Verification Badge */}
      {selfVerified && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 12px', 
          backgroundColor: '#e8f5e8', 
          color: '#2d5a2d', 
          borderRadius: '8px', 
          marginBottom: '16px',
          border: '1px solid #4caf50'
        }}>
          <span>✅</span>
          <span style={{ fontWeight: '500' }}>Identity Verified</span>
        </div>
      )}
      
      <div className={styles.evidenceBox}>
        <div className={styles.from}>From: {evidence.from}</div>
        <div className={styles.message}>{evidence.message}</div>
        <div className={styles.sent}>{evidence.sent}</div>
      </div>
      <div className={styles.label}>Additional context:</div>
      <div className={styles.context}>{evidence.context || <span style={{ color: '#aaa' }}>(none)</span>}</div>

      <div className={styles.label}>Proof:</div>
      <div className={styles.proof}>{evidence.proof}</div>
      {evidence.rawproof && evidence.id && (
        <div style={{ margin: '12px 0' }}>
          <a
            href={`data:application/json,${encodeURIComponent(JSON.stringify(evidence.rawproof, null, 2))}`}
            download={`rawproof-${evidence.id}.txt`}
            style={{ color: '#0070f3', textDecoration: 'underline' }}
          >
            Download Raw Proof (.txt)
          </a>
        </div>
      )}
      {onPublish && (
        <button
          className={styles.button}
          onClick={onPublish}
        >
          Publish Evidence
        </button>
      )}
    </div>
  );
} 