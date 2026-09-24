import React from 'react';
import { motion } from 'framer-motion';
import styles from './otp.module.css';

export default function OTPInputs({ otp, inputRefs, onChange, onKeyDown, onPaste }) {
  return (
    <div className={styles.otpInputs} onPaste={onPaste}>
      {otp.map((digit, index) => {
        const hasValue = digit !== '';

        return (
          <motion.input
            key={index}
            ref={inputRefs[index]}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(index, e)}
            className={`${styles.otpBox} ${hasValue ? styles.otpBoxHasValue : ''}`}
            whileFocus={{
              scale: 1.08,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            animate={
              hasValue
                ? { scale: [1, 1.12, 1], transition: { duration: 0.2 } }
                : { scale: 1 }
            }
          />
        );
      })}
    </div>
  );
}