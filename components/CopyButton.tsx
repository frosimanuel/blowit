'use client';
import React, { useState } from 'react';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatWalletId = (walletId: string) => {
    if (walletId.length <= 10) return walletId;
    const first5 = walletId.substring(0, 5);
    const last5 = walletId.substring(walletId.length - 5);
    return (
      <>
        <strong>{first5}</strong>
        ...
        <strong>{last5}</strong>
      </>
    );
  };

  return (
    <div 
      className={`${styles.container} ${copied ? styles.copied : ''}`}
      onClick={handleCopy}
      title="Click to copy"
    >
      <svg 
        className={styles.icon} 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        {copied ? (
          // Checkmark icon
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        ) : (
          // Copy icon
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        )}
      </svg>
      <span className={styles.text}>
        {formatWalletId(text)}
      </span>
    </div>
  );
} 