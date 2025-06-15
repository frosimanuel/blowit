'use client';
import React from 'react';
import styles from './PublishSuccess.module.css';

interface PublishSuccessProps {
  evidence: {
    from: string;
    message: string;
    sent: string;
    context: string;
    publicAddress: string;
    railgunAddress: string;
    proof: string;
    rawproof: any;
    id: string;
  };
}

export default function PublishSuccess({ evidence }: PublishSuccessProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Congratulations!</h2>
      <div className={styles.subtitle}>Your evidence is published.</div>
      <div className={styles.evidenceBox}>
        <div className={styles.from}>From: {evidence.from}</div>
        <div className={styles.message}>{evidence.message}</div>
        <div className={styles.sent}>{evidence.sent}</div>
        <div className={styles.label}>Additional context:</div>
        <div className={styles.context}>{evidence.context || <span style={{ color: '#aaa' }}>(none)</span>}</div>
        <div className={styles.label}>Your public Wallet Address:</div>
        <div className={styles.address}>{evidence.publicAddress}</div>
        <div className={styles.label}>Your private zk Wallet Address:</div>
        <div className={styles.address}>{evidence.railgunAddress}</div>
        <div className={styles.label}>Proof:</div>
        <div className={styles.proof}>{evidence.proof}</div>
        <div className={styles.label}>Raw Proof:</div>
        <a
          href={`data:application/json,${encodeURIComponent(JSON.stringify(evidence.rawproof, null, 2))}`}
          download={`rawproof-${evidence.id}.txt`}
          style={{ color: '#0070f3', textDecoration: 'underline', marginLeft: 8 }}
        >
          Download Raw Proof (.txt)
        </a>
      </div>
    </div>
  );
} 