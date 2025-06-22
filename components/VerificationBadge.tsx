'use client';
import React from 'react';
import styles from './VerificationBadge.module.css';

interface VerificationBadgeProps {
  verified: boolean;
  timestamp?: string;
  compact?: boolean;
}

export default function VerificationBadge({ verified, timestamp, compact = false }: VerificationBadgeProps) {
  if (!verified) return null;

  return (
    <div className={`${styles.badge} ${compact ? styles.compact : ''}`}>
      <span>✅</span>
      <span>Identity Verified</span>
      {timestamp && (
        <span className={styles.timestamp}>
          • {new Date(timestamp).toLocaleDateString()}
        </span>
      )}
    </div>
  );
} 