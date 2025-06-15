'use client';
import React, { useState } from 'react';
import styles from './EvidenceForm.module.css';

interface EvidenceFormProps {
  onNext: (context: string) => void;
}

export default function EvidenceForm({ onNext }: EvidenceFormProps) {
  const [context, setContext] = useState('');
  const [evidence] = useState({
    from: 'Andreas (@archive_eth)',
    message: 'you keep getting logged out from ddocs every 15mins',
    sent: 'Sent on June 14th at 2:01 AM'
  });

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