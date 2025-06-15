'use client';
import React, { useState } from 'react';
import styles from './SeedPhraseConfirm.module.css';

interface SeedPhraseConfirmProps {
  mnemonic: string;
  onConfirm: () => void;
  onBack: () => void;
}

export default function SeedPhraseConfirm({ mnemonic, onConfirm, onBack }: SeedPhraseConfirmProps) {
  const words = mnemonic.split(' ');
  // For demo, let's hide 6, 7, 11 (indices 5, 6, 10)
  const missingIndices = [5, 6, 10];
  const [inputs, setInputs] = useState<string[]>(Array(missingIndices.length).fill(''));
  const [touched, setTouched] = useState(false);

  const handleInput = (idx: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[idx] = value;
    setInputs(newInputs);
  };

  const isCorrect = inputs.every((val, i) => val.trim().toLowerCase() === words[missingIndices[i]]);
  const canConfirm = inputs.every(val => val.trim().length > 0);

  return (
    <div>
      <button
        className={styles.backButton}
        onClick={onBack}
      >
        ← Back
      </button>
      <div className={styles.heading}>
        Confirm your seedphrase
      </div>
      <div className={styles.instructions}>
        Let's make sure you really wrote down your seedphrase words.<br />
        <b>Please write the 3 missing words.</b>
      </div>
      <div className={styles.wordsGrid}>
        {words.map((word, i) => {
          const missingIdx = missingIndices.indexOf(i);
          if (missingIdx !== -1) {
            const isInputCorrect = touched && inputs[missingIdx] && inputs[missingIdx].trim().toLowerCase() === word;
            return (
              <input
                key={i}
                type="text"
                value={inputs[missingIdx]}
                onChange={e => handleInput(missingIdx, e.target.value)}
                className={
                  isInputCorrect
                    ? `${styles.wordInput} ${styles.wordInputCorrect}`
                    : styles.wordInput
                }
                onBlur={() => setTouched(true)}
              />
            );
          }
          return (
            <div key={i} className={styles.wordBox}>
              <span className={styles.wordIndex}>{i + 1}</span>
              {word}
            </div>
          );
        })}
      </div>
      <button
        className={
          canConfirm && isCorrect
            ? styles.confirmButton
            : `${styles.confirmButton} ${styles.confirmButtonDisabled}`
        }
        disabled={!canConfirm || !isCorrect}
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
} 