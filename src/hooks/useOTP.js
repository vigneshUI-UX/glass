import { useState, useRef, useEffect } from 'react';

export function useOTP(length = 4) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const [generatedCode, setGeneratedCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef(Array(length).fill(null).map(() => useRef(null)));

  const generateCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(newCode);
  };

  useEffect(() => {
    generateCode();
  }, []);

  // WebOTP API: Auto-read SMS on supported browsers/devices
  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otpCredential) => {
          if (otpCredential && otpCredential.code) {
            const digits = otpCredential.code.slice(0, length).split('');
            setOtp(digits);
            if (otpCredential.code.slice(0, length) === generatedCode) {
              setIsVerified(true);
            }
          }
        })
        .catch((err) => {
          console.log('WebOTP auto-read canceled or not triggered:', err);
        });

      return () => ac.abort();
    }
  }, [generatedCode, length]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      if (newOtp.join('') === generatedCode) {
        setIsVerified(true);
      }
    }
  };

  // Clipboard Paste Support (e.g., user presses Ctrl+V or Cmd+V)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split('');
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });
    setOtp(newOtp);

    // Focus last filled box
    const targetIdx = Math.min(digits.length, length - 1);
    inputRefs.current[targetIdx].current?.focus();

    if (newOtp.every((d) => d !== '') && newOtp.join('') === generatedCode) {
      setIsVerified(true);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const fillCode = () => {
    const codeArray = generatedCode.split('');
    setOtp(codeArray);
    setIsVerified(true);
  };

  const reset = () => {
    setOtp(Array(length).fill(''));
    setIsVerified(false);
    generateCode();
  };

  return {
    otp,
    generatedCode,
    isVerified,
    inputRefs: inputRefs.current,
    handleChange,
    handleKeyDown,
    handlePaste,
    fillCode,
    reset,
  };
}