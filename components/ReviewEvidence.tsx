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
  };
  onPublish: () => void;
}

export default function ReviewEvidence({ evidence, onPublish }: ReviewEvidenceProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Review your evidence
      </h2>
      <div className={styles.evidenceBox}>
        <div className={styles.from}>From: {evidence.from}</div>
        <div className={styles.message}>{evidence.message}</div>
        <div className={styles.sent}>{evidence.sent}</div>
      </div>
      <div className={styles.label}>Additional context:</div>
      <div className={styles.context}>{evidence.context || <span style={{ color: '#aaa' }}>(none)</span>}</div>
      <div className={styles.label}>Your private zk Wallet Address:</div>
      <div className={styles.address}>{evidence.railgunAddress}</div>
      <div className={styles.label}>Your public Wallet Address:</div>
      <div className={styles.address}>{evidence.publicAddress}</div>
      <div className={styles.label}>Proof:</div>
      <div className={styles.proof}>{evidence.proof}</div>
      <button
        className={styles.button}
        onClick={onPublish}
      >
        Publish Evidence
      </button>
    </div>
  );
} 