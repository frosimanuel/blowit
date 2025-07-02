'use client';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabaseClient';
import styles from './SelfVerification.module.css';

interface SelfVerificationProps {
  onVerified: (verificationData: any) => void;
  onSkip: () => void;
  postId?: string; // Optional postId for updating existing posts
}

type VerificationStatus = 'pending' | 'success' | 'error' | 'none';

export default function SelfVerification({ onVerified, onSkip, postId }: SelfVerificationProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('none');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [SelfQRcodeWrapper, setSelfQRcodeWrapper] = useState<any>(null);
  const [selfApp, setSelfApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Your backend verification endpoint
  const BACKEND_URL = 'https://api.goblow.it/verify';

  useEffect(() => {
    // Generate a user ID when the component mounts
    setUserId(uuidv4());
  }, []);

  useEffect(() => {
    const initializeSelf = async () => {
      try {
        // Dynamically import the Self components to avoid build-time issues
        const { default: QRWrapper, SelfAppBuilder, countries } = await import('@selfxyz/qrcode');
        
        setSelfQRcodeWrapper(() => QRWrapper);

        // Configure what information will be shared
        const disclosures = {
          // Only share nationality - minimal disclosure for privacy
          issuing_state: false,
          name: false,
          nationality: true,
          date_of_birth: false,
          passport_number: false,
          gender: false,
          expiry_date: false,
          // Verification rules
          minimumAge: 18,
          excludedCountries: [
            countries.IRAN,
            countries.IRAQ,
            countries.NORTH_KOREA,
            countries.RUSSIA,
            countries.SYRIAN_ARAB_REPUBLIC,
            countries.VENEZUELA
          ],
          ofac: true, // Check against sanctions list
        };

        // Create the SelfApp configuration
        const app = new SelfAppBuilder({
          appName: "BlowIt",
          scope: "goblowit-app-scope",
          endpoint: BACKEND_URL,
          endpointType: "https",
          userId: userId!,
          disclosures,
          devMode: false,
        }).build();

        setSelfApp(app);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Self components:', error);
        setErrorMessage('Failed to initialize verification system. Please try again.');
        setIsLoading(false);
      }
    };

    if (userId) {
      initializeSelf();
    }
  }, [userId]);

  const handleVerificationSuccess = () => {
    console.log('Self verification successful!');
    setVerificationStatus('success');
    
    // Call the onVerified callback with verification data
    onVerified({
      verified: true,
      userId: userId,
      timestamp: new Date().toISOString(),
      method: 'self_qr_verification'
    });
  };

  const handleVerificationError = (error: any) => {
    console.error('Self verification error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    let errorMsg = 'QR code verification failed. Please try again.';
    
    if (error && typeof error === 'object') {
      if (error.message) {
        errorMsg = error.message;
      } else if (error.error) {
        errorMsg = error.error;
      } else if (error.reason) {
        errorMsg = error.reason;
      } else if (Object.keys(error).length > 0) {
        errorMsg = `Verification error: ${JSON.stringify(error)}`;
      }
    } else if (typeof error === 'string') {
      errorMsg = error;
    }
    
    setVerificationStatus('error');
    setErrorMessage(errorMsg);
  };

  const renderStatusMessage = () => {
    switch (verificationStatus) {
      case 'pending':
        return (
          <div className={`${styles.verificationStatus} ${styles.verificationPending}`}>
            <span>⏳</span>
            Verifying your identity...
          </div>
        );
      case 'success':
        return (
          <div className={`${styles.verificationStatus} ${styles.verificationSuccess}`}>
            <span>✅</span>
            Identity verified successfully!
          </div>
        );
      case 'error':
        return (
          <div className={`${styles.verificationStatus} ${styles.verificationError}`}>
            <span>❌</span>
            {errorMessage}
          </div>
        );
      default:
        return null;
    }
  };

  // Show loading if components aren't initialized yet
  if (isLoading || !userId || !SelfQRcodeWrapper || !selfApp) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Verify Your Identity</h2>
        {errorMessage ? (
          <div className={`${styles.verificationStatus} ${styles.verificationError}`}>
            <span>❌</span>
            {errorMessage}
            <br />
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '8px',
                padding: '4px 8px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className={styles.verificationStatus}>
            <span>⏳</span>
            Initializing verification system...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.skipButtonContainer}>
        <button 
          className={styles.skipButton}
          onClick={onSkip}
          disabled={verificationStatus === 'pending'}
        >
          Skip verification
        </button>
      </div>
      <h2 className={styles.heading}>Verify Your Identity</h2>
      
      <div className={styles.description}>
        <p>
          <strong>Optional Human Verification</strong>
        </p>
        <p>
          This step is completely optional but adds credibility to your evidence. 
          By verifying your identity, you'll receive a special verification badge 
          that shows you're a real human.
        </p>
        
        <div className={styles.infoBox}>
          <h4>What information will be shared?</h4>
          <ul>
            <li>✅ <strong>Nationality only</strong> - Your country of citizenship</li>
            <li>✅ <strong>Age verification</strong> - Confirms you're 18 or older</li>
            <li>✅ <strong>Sanctions check</strong> - Ensures compliance with regulations</li>
            <li>❌ <strong>No personal details</strong> - Name, passport number, and other personal info remain private</li>
          </ul>
          
          <p className={styles.privacyNote}>
            <strong>Privacy First:</strong> We only verify that you're a human from an eligible country. 
            No personal identifying information is stored or shared.
          </p>
        </div>
      </div>
      
      <div className={styles.qrContainer}>
        <SelfQRcodeWrapper
          selfApp={selfApp}
          onSuccess={handleVerificationSuccess}
          onError={handleVerificationError}
          size={350}
        />
      </div>

      {renderStatusMessage()}
    </div>
  );
} 