import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './otp.module.css';

export default function OTPSuccess({ onReset }) {
  return (
    <motion.div
      className={styles.verifiedContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      <motion.div
        className={styles.checkIconCircle}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <Check size={36} strokeWidth={3} />
      </motion.div>

      <h2 className={styles.cardTitle}>Number Verified</h2>
      <p className={styles.cardSubtitle} style={{ marginBottom: '28px' }}>
        You are logged in on this device.
      </p>

      <motion.button
        className={styles.btnGreen}
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}