"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEmergency } from "@/hooks/use-emergency"
import "@/styles/emergency.css"
import {
  Phone,
  MapPin,
  Heart,
  Activity,
  Flame,
  Droplets,
  Skull,
  Wind,
  Zap,
  Baby,
  ArrowLeft,
  ChevronRight,
  X,
  Shield,
  Clock,
  Users,
  Volume2,
  VolumeX,
  Navigation,
  CheckCircle,
  AlertCircle,
  Loader2,
  Siren,
  HeartPulse,
  Share2,
  Copy,
  PhoneCall,
  Hospital,
  Mic,
  MicOff,
} from "lucide-react"
import Link from "next/link"

const nearbyHospitals = [
  { name: "Central Medical Center", distance: "0.8 miles", time: "4 mins", status: "Available", address: "123 Health Ave" },
  { name: "St. Jude Hospital", distance: "2.4 miles", time: "9 mins", status: "Busy", address: "456 Care St" },
  { name: "Metropolitan ER", distance: "3.1 miles", time: "12 mins", status: "Available", address: "789 Emergency Rd" },
]

const emergencyContacts = [
  {
    name: "Emergency",
    number: "911",
    icon: Phone,
    color: "from-red-500 to-red-600",
    description: "Police, Fire, Ambulance",
    priority: 1,
  },
  {
    name: "Poison Control",
    number: "1-800-222-1222",
    icon: Skull,
    color: "from-purple-500 to-purple-600",
    description: "24/7 Hotline",
    priority: 2,
  },
  {
    name: "Suicide Prevention",
    number: "988",
    icon: Heart,
    color: "from-blue-500 to-indigo-600",
    description: "Crisis Lifeline",
    priority: 3,
  },
]

const firstAidGuides = [
  {
    id: "cpr",
    title: "CPR",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    bgGlow: "rgba(239, 68, 68, 0.3)",
    description: "Cardiopulmonary Resuscitation",
    urgency: "critical",
    steps: [
      "Check the scene for safety and check the person for responsiveness",
      "Call 911 immediately or have someone else call",
      "Place the person on their back on a firm, flat surface",
      "Place the heel of one hand on the center of the chest, between the nipples",
      "Place your other hand on top, interlacing your fingers",
      "Push hard and fast - at least 2 inches deep, 100-120 compressions per minute",
      "Allow full chest recoil between compressions",
      "Continue until help arrives or an AED is available",
    ],
  },
  {
    id: "choking",
    title: "Choking",
    icon: Wind,
    color: "from-orange-500 to-amber-600",
    bgGlow: "rgba(249, 115, 22, 0.3)",
    description: "Heimlich Maneuver",
    urgency: "critical",
    steps: [
      "Ask 'Are you choking?' - if they can't speak, cough, or breathe, act immediately",
      "Stand behind the person and wrap your arms around their waist",
      "Make a fist with one hand and place it just above the navel",
      "Grasp your fist with your other hand",
      "Give quick, upward thrusts into the abdomen",
      "Repeat until the object is expelled or the person can breathe",
      "If the person becomes unconscious, begin CPR",
      "Call 911 if the object doesn't come out quickly",
    ],
  },
  {
    id: "burns",
    title: "Burns",
    icon: Flame,
    color: "from-yellow-500 to-orange-600",
    bgGlow: "rgba(234, 179, 8, 0.3)",
    description: "Burn Treatment",
    urgency: "high",
    steps: [
      "Remove the person from the source of the burn",
      "Cool the burn with cool (not cold) running water for 10-20 minutes",
      "Do NOT apply ice, butter, or any home remedies",
      "Remove jewelry or tight clothing before swelling starts",
      "Cover the burn loosely with a sterile, non-stick bandage",
      "Take over-the-counter pain medication if needed",
      "Seek medical attention for burns larger than 3 inches or on face/hands/feet",
      "Watch for signs of infection: increased pain, redness, fever",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    icon: Droplets,
    color: "from-red-600 to-red-700",
    bgGlow: "rgba(220, 38, 38, 0.3)",
    description: "Stop Heavy Bleeding",
    urgency: "critical",
    steps: [
      "Call 911 for severe or uncontrolled bleeding",
      "Apply direct pressure to the wound with a clean cloth or bandage",
      "If blood soaks through, add more layers - don't remove the first one",
      "Maintain constant pressure for at least 15 minutes",
      "If possible, elevate the injured area above the heart",
      "Apply a tourniquet only as a last resort for life-threatening limb bleeding",
      "Keep the person calm and still",
      "Monitor for signs of shock: pale skin, rapid breathing, confusion",
    ],
  },
  {
    id: "shock",
    title: "Shock",
    icon: Zap,
    color: "from-blue-500 to-indigo-600",
    bgGlow: "rgba(59, 130, 246, 0.3)",
    description: "Treat for Shock",
    urgency: "high",
    steps: [
      "Call 911 immediately",
      "Have the person lie down on their back",
      "Elevate their legs about 12 inches (unless injured)",
      "Keep the person still - don't move them unnecessarily",
      "Cover them with a blanket to maintain body temperature",
      "Don't give them anything to eat or drink",
      "Loosen any tight clothing",
      "Monitor breathing and be prepared to perform CPR if needed",
    ],
  },
  {
    id: "infant-cpr",
    title: "Infant CPR",
    icon: Baby,
    color: "from-pink-500 to-rose-600",
    bgGlow: "rgba(236, 72, 153, 0.3)",
    description: "CPR for Babies Under 1 Year",
    urgency: "critical",
    steps: [
      "Check for responsiveness - tap the baby's foot gently",
      "Call 911 or have someone call while you start CPR",
      "Place the baby on a firm, flat surface",
      "Give 30 chest compressions using 2 fingers on the breastbone",
      "Push down about 1.5 inches deep, at a rate of 100-120 per minute",
      "Tilt the head back slightly and lift the chin to open the airway",
      "Give 2 gentle breaths, covering baby's mouth and nose",
      "Continue cycles of 30 compressions and 2 breaths until help arrives",
    ],
  },
]

export function EmergencySOS() {
  const {
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
  } = useEmergency()

  const [selectedGuide, setSelectedGuide] = useState<(typeof firstAidGuides)[0] | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isAudioGuideEnabled, setIsAudioGuideEnabled] = useState(false)
  const [showHospitals, setShowHospitals] = useState(false)

  // Motion values for interactive animations
  const sosScale = useMotionValue(1)
  const springScale = useSpring(sosScale, { stiffness: 300, damping: 20 })

  useEffect(() => {
    if (isAudioGuideEnabled && selectedGuide) {
      speak(`Step ${currentStep + 1}: ${selectedGuide.steps[currentStep]}`)
    }
  }, [currentStep, selectedGuide, isAudioGuideEnabled, speak])

  const toggleAudioGuide = () => {
    if (isAudioGuideEnabled) {
      stopSpeaking()
    } else if (selectedGuide) {
      speak(`Audio guide enabled. Step ${currentStep + 1}: ${selectedGuide.steps[currentStep]}`)
    }
    setIsAudioGuideEnabled(!isAudioGuideEnabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-red-950/10 relative">
      {/* Advanced CSS background noise and pulse */}
      <div className="emergency-bg-noise" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="radar-sweep opacity-20" />
      </div>

      <header className="sticky top-0 z-50 border-b border-red-500/20 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-500/10 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <motion.div
                className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Siren className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h1 className="font-bold text-foreground text-lg">Emergency SOS</h1>
                <p className="text-xs text-muted-foreground">MediCare+ Response</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`rounded-full gap-2 transition-all ${isAudioGuideEnabled ? 'bg-red-500 text-white' : ''}`}
              onClick={toggleAudioGuide}
            >
              {isAudioGuideEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              <span className="hidden sm:inline">Voice</span>
            </Button>
            <Badge variant="destructive" className="gap-1.5 px-3 py-1.5 animate-pulse bg-red-600 border-0">
              <Activity className="h-3 w-3" />
              Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8 relative z-10">
        {/* Main SOS Button Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="relative mb-8">
            {/* CSS-based pulse rings */}
            <div className="sos-pulse-container absolute inset-0 flex items-center justify-center">
              <div className="sos-pulse-ring" />
              <div className="sos-pulse-ring" style={{ animationDelay: '0.5s' }} />
              <div className="sos-pulse-ring" style={{ animationDelay: '1s' }} />
            </div>

            {/* Progress ring */}
            {isHolding && (
              <svg
                className="absolute inset-0 w-44 h-44 -rotate-90 mx-auto my-auto"
                style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%) rotate(-90deg)" }}
              >
                <circle cx="88" cy="88" r="80" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="8" />
                <motion.circle
                  cx="88"
                  cy="88"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={502}
                  strokeDashoffset={502 - (502 * holdProgress) / 100}
                />
              </svg>
            )}

            {/* Main SOS button */}
            <motion.button
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              style={{ scale: springScale }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10"
            >
              <div className={`
                relative flex h-40 w-40 items-center justify-center rounded-full
                bg-gradient-to-br from-red-500 via-red-600 to-red-700
                shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all duration-300
                ${isHolding ? "ring-8 ring-white/20 scale-110" : ""}
              `}>
                <div className="text-center text-white">
                  {isHolding ? (
                    <div className="text-4xl font-black">{Math.ceil((100 - holdProgress) / 20)}</div>
                  ) : (
                    <>
                      <PhoneCall className="mx-auto mb-1 h-12 w-12" />
                      <span className="text-2xl font-black tracking-tighter">SOS</span>
                    </>
                  )}
                </div>
                {/* Heartbeat animation line */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                  <path
                    className="heartbeat-line"
                    d="M0,50 L20,50 L25,30 L35,70 L45,20 L55,80 L65,40 L70,60 L80,50 L100,50"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </motion.button>
          </div>

          <p className="text-sm font-bold text-red-500 animate-pulse">HOLD BUTTON TO CALL EMERGENCY</p>
        </motion.div>

        {/* Location & Nearby Hospitals Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Location Card */}
          <Card className="relative overflow-hidden p-6 border-red-500/20 bg-card/50 backdrop-blur-xl group">
            <div className="scanning-line" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Live Location</h3>
                  <p className="text-xs text-muted-foreground">Automatic tracking enabled</p>
                </div>
              </div>
              
              <div className="space-y-2 p-3 rounded-xl bg-muted/50 font-mono text-xs">
                {location ? (
                  <>
                    <div className="flex justify-between"><span>LATITUDE</span><span>{location.lat.toFixed(6)}</span></div>
                    <div className="flex justify-between"><span>LONGITUDE</span><span>{location.lng.toFixed(6)}</span></div>
                    <div className="flex justify-between text-green-500"><span>STATUS</span><span>STABLE</span></div>
                  </>
                ) : (
                  <div className="text-center py-2 animate-pulse">WAITING FOR GPS SIGNAL...</div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={updateLocation}>
                  {locationStatus === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
                </Button>
                <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => location && window.open(`https://maps.google.com/?q=${location.lat},${location.lng}`)}>
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </div>
            </div>
          </Card>

          {/* Hospitals Toggle Card */}
          <Card className="relative overflow-hidden p-6 border-blue-500/20 bg-card/50 backdrop-blur-xl group cursor-pointer" onClick={() => setShowHospitals(!showHospitals)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                  <Hospital className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Nearby Facilities</h3>
                  <p className="text-xs text-muted-foreground">3 hospitals within 5 miles</p>
                </div>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${showHospitals ? 'rotate-90' : ''}`} />
            </div>

            <AnimatePresence>
              {showHospitals && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3"
                >
                  {nearbyHospitals.map((hospital, i) => (
                    <div key={i} className="p-2 rounded-lg bg-muted/30 border border-border/50 text-xs flex justify-between items-center">
                      <div>
                        <p className="font-bold">{hospital.name}</p>
                        <p className="text-muted-foreground">{hospital.distance} • {hospital.time}</p>
                      </div>
                      <Badge variant={hospital.status === 'Available' ? 'outline' : 'secondary'} className={hospital.status === 'Available' ? 'text-green-500 border-green-500' : ''}>
                        {hospital.status}
                      </Badge>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Priority Contacts
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {emergencyContacts.map((contact, i) => (
              <motion.a
                key={i}
                href={`tel:${contact.number}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className={`p-4 bg-gradient-to-br ${contact.color} border-0 text-white relative overflow-hidden group`}>
                  <contact.icon className="absolute -right-2 -bottom-2 h-16 w-16 opacity-20 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{contact.name}</p>
                  <p className="text-2xl font-black">{contact.number}</p>
                  <p className="text-[10px] mt-2 opacity-90">{contact.description}</p>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>

        {/* First Aid Section */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Interactive First Aid
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {firstAidGuides.map((guide, i) => (
              <Card 
                key={i} 
                className="p-4 cursor-pointer hover:border-primary/50 transition-all bg-card/50 backdrop-blur-sm group"
                onClick={() => { setSelectedGuide(guide); setCurrentStep(0); }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${guide.color} text-white`}>
                    <guide.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{guide.title}</h3>
                    <p className="text-[10px] text-muted-foreground">{guide.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* SOS Confirmation Modal */}
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-red-950/95 p-4 backdrop-blur-xl"
          >
            <div className="text-center max-w-sm w-full">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-32 h-32 rounded-full bg-red-600 mx-auto flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(239,68,68,1)]"
              >
                <span className="text-6xl font-black text-white">{countdown}</span>
              </motion.div>
              <h2 className="text-3xl font-black text-white mb-4">EMERGENCY ALERT</h2>
              <p className="text-red-200 mb-8">Dialing emergency services and broadcasting location in {countdown} seconds...</p>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full bg-transparent text-white border-white/20 hover:bg-white/10"
                onClick={cancelEmergency}
              >
                CANCEL EMERGENCY
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guide Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedGuide(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-border/50"
              onClick={e => e.stopPropagation()}
            >
              <div className={`p-6 bg-gradient-to-r ${selectedGuide.color} text-white flex justify-between items-center`}>
                <div className="flex items-center gap-4">
                  <selectedGuide.icon className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">{selectedGuide.title}</h3>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setSelectedGuide(null)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="p-8">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Step {currentStep + 1} of {selectedGuide.steps.length}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`rounded-full ${isAudioGuideEnabled ? 'text-primary' : ''}`}
                    onClick={toggleAudioGuide}
                  >
                    {isAudioGuideEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="min-h-[120px] flex items-center">
                  <motion.p 
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-medium leading-tight"
                  >
                    {selectedGuide.steps[currentStep]}
                  </motion.p>
                </div>

                <div className="flex gap-4 mt-12">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-14 rounded-2xl"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className={`flex-1 h-14 rounded-2xl bg-gradient-to-r ${selectedGuide.color}`}
                    onClick={() => {
                      if (currentStep < selectedGuide.steps.length - 1) {
                        setCurrentStep(prev => prev + 1)
                      } else {
                        setSelectedGuide(null)
                      }
                    }}
                  >
                    {currentStep === selectedGuide.steps.length - 1 ? "Finish" : "Next Step"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

