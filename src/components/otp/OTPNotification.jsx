import React from 'react';
import { motion } from 'framer-motion';
import styles from './otp.module.css';

export default function OTPNotification({ generatedCode, onFillCode }) {
  return (
    <div className={styles.notificationBanner}>
      <div className={styles.notificationInfo}>
        <span className={styles.notificationLabel}>MESSAGE</span>
        <span className={styles.notificationText}>
          NEXORA — <strong>{generatedCode}</strong> is your verification code
        </span>
      </div>
      <motion.button
        className={styles.btnNeon}
        onClick={onFillCode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Fill Code
      </motion.button>
    </div>
  );
}