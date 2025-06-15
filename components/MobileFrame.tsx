'use client';
import React, { ReactNode } from 'react';
import styles from './MobileFrame.module.css';

interface MobileFrameProps {
  children: ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) {
    return (
      <div className={styles.mobileFrame}>
        <div className={styles.statusBar}>
          <span>2:38</span>
          <span className={styles.statusIcons}>🛜 🔋</span>
        </div>
        <div className={styles.mobileContent}>
          {children}
        </div>
        <div className={styles.mobileFooter}>
          <span>goblow.it</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.responsiveContainer}>
        {children}
      </div>
    );
  }
} 