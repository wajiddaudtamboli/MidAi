"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export function useEmergency() {
  const [isHolding, setIsHolding] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [isSpeaking, setIsSpeaking] = useState(false)

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return
    
    // Cancel any ongoing speech
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synthRef.current.speak(utterance)
  }, [])

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const startHold = useCallback(() => {
    setIsHolding(true)
    setHoldProgress(0)

    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    holdTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const newProgress = prev + 2 // 5 seconds total (100 / 50 intervals)
        if (newProgress >= 100) {
          clearInterval(holdTimerRef.current!)
          startCountdown()
          return 100
        }
        if (navigator.vibrate && Math.floor(newProgress) % 20 === 0) {
          navigator.vibrate(30)
        }
        return newProgress
      })
    }, 100)
  }, [])

  const endHold = useCallback(() => {
    setIsHolding(false)
    setHoldProgress(0)
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current)
    }
  }, [])

  const startCountdown = useCallback(() => {
    setCountdown(5)
    speak("Emergency countdown started. Calling emergency services in 5 seconds.")

    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownTimerRef.current!)
          // In a real app, this would trigger the actual call
          speak("Dialing emergency services.")
          return null
        }
        if (navigator.vibrate) {
          navigator.vibrate(100)
        }
        return prev - 1
      })
    }, 1000)
  }, [speak])

  const cancelEmergency = useCallback(() => {
    setCountdown(null)
    setIsHolding(false)
    setHoldProgress(0)
    stopSpeaking()
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current)
    }
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current)
    }
    speak("Emergency cancelled.")
  }, [stopSpeaking, speak])

  const updateLocation = useCallback(async () => {
    setLocationStatus("loading")
    if (!navigator.geolocation) {
      setLocationStatus("error")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setLocationStatus("success")
      },
      () => setLocationStatus("error"),
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }, [])

  return {
    isHolding,
    holdProgress,
    countdown,
    location,
    locationStatus,
    isSpeaking,
    startHold,
    endHold,
    cancelEmergency,
    updateLocation,
    speak,
    stopSpeaking
  }
}
