'use client';
import React from 'react';
import styles from './SeedPhraseDisplay.module.css';

interface SeedPhraseDisplayProps {
  mnemonic: string;
  onNext: () => void;
}

export default function SeedPhraseDisplay({ mnemonic, onNext }: SeedPhraseDisplayProps) {
  const words = mnemonic.split(' ');
  return (
    <div>
      <h2 className={styles.heading}>
        Save your new anonymous wallet
      </h2>
      <div className={styles.instructions}>
        Save the seedphrase for your new, clean, and private Railgun powered wallet.<br />
        <b>Please write down these 12 words.</b>
      </div>
      <div className={styles.wordsGrid}>
        {words.map((word, i) => (
          <div key={i} className={styles.wordBox}>
            <span className={styles.wordIndex}>{i + 1}</span>
            {word}
          </div>
        ))}
      </div>
      <button
        className={styles.button}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
} 