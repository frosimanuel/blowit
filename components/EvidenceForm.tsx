'use client';
import React, { useState } from 'react';
import styles from './EvidenceForm.module.css';

interface EvidenceFormProps {
  onNext: (context: string) => void;
  evidence: {
    from: string;
    message: string;
    sent: string;
  };
}

export default function EvidenceForm({ onNext, evidence }: EvidenceFormProps) {
  const [context, setContext] = useState('');

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Let's publish your evidence, anonymously.
      </h2>
      <div className={styles.evidenceBox}>
        <div className={styles.from}>From: {evidence.from}</div>
        <div className={styles.message}>{evidence.message}</div>
        <div className={styles.sent}>{evidence.sent}</div>
      </div>
      <div className={styles.label}>Evidence context (optional):</div>
      <textarea
        className={styles.textarea}
        placeholder="Provide additional information to contextualize this piece of evidence"
        value={context}
        onChange={e => setContext(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={() => onNext(context)}
      >
        Next
      </button>
    </div>
  );
} 