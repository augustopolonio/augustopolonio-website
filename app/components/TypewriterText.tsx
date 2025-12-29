'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
  onTextChange?: (index: number) => void;
}

export default function TypewriterText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  className = '',
  onTextChange,
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (onTextChange && !isDeleting && currentText === texts[currentTextIndex]) {
      onTextChange(currentTextIndex);
    }
  }, [currentTextIndex, currentText, isDeleting, texts, onTextChange]);

  useEffect(() => {
    const fullText = texts[currentTextIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimeout);
    }

    if (!isDeleting && currentText === fullText) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return fullText.substring(0, prev.length - 1);
          } else {
            return fullText.substring(0, prev.length + 1);
          }
        });
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {currentText}
      <span className="inline-block w-[3px] h-[1em] bg-current ml-1 animate-cursor-blink align-middle" />
    </span>
  );
}
