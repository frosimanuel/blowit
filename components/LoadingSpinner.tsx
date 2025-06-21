'use client';
import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  text?: string;
  subtext?: string;
}

export default function LoadingSpinner({ 
  text = "Creating your wallet...", 
  subtext = "This may take a few moments. Please don't close this window." 
}: LoadingSpinnerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <div className={styles.text}>{text}</div>
      <div className={styles.subtext}>{subtext}</div>
    </div>
  );
} 