'use client';
import React from 'react';
import styles from './PublishSuccess.module.css';

interface PublishSuccessProps {
  evidence: {
    from: string;
    message: string;
    sent: string;
    context: string;
  };
}

export default function PublishSuccess({ evidence }: PublishSuccessProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Congratulations!
      </h2>
      <div className={styles.subtitle}>
        Your evidence is published.
      </div>
      <div className={styles.evidenceBox}>
        <div className={styles.from}>From: {evidence.from}</div>
        <div className={styles.message}>{evidence.message}</div>
        <div className={styles.sent}>{evidence.sent}</div>
      </div>
      <div className={styles.label}>Additional context:</div>
      <div className={styles.context}>{evidence.context || <span style={{ color: '#aaa' }}>(none)</span>}</div>
    </div>
  );
} 