import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOTP } from '../../hooks/useOTP';
import OTPInputs from './OTPInputs';
import OTPNotification from './OTPNotification';
import OTPSuccess from './OTPSuccess';
import styles from './otp.module.css';

export default function OTPVerification() {
  const {
    otp,
    generatedCode,
    isVerified,
    inputRefs,
    handleChange,
    handleKeyDown,
    handlePaste, // <-- ADD THIS LINE
    fillCode,
    reset,
  } = useOTP();

  return (
    <div style={{ position: 'relative' }}>
      <div className="glow-bg-1" />
      <div className="glow-bg-2" />

      <motion.div
        className={`${styles.otpCard} ${isVerified ? styles.success : ''}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          {!isVerified ? (
            <motion.div
              key="input-stage"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.brandTag}>NEXORA</div>
                <h2 className={styles.cardTitle}>Verify Number</h2>
                <p className={styles.cardSubtitle}>
                  Enter the 4-digit code sent to <span>+91 95405 *** 810</span>
                </p>
              </div>

              <OTPInputs
                otp={otp}
                inputRefs={inputRefs}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
              />

              <OTPNotification
                generatedCode={generatedCode}
                onFillCode={fillCode}
              />
            </motion.div>
          ) : (
            <OTPSuccess key="verified-stage" onReset={reset} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}