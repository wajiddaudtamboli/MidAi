"use client"

import { motion } from "framer-motion"
import { 
  Mic, 
  Phone, 
  Video, 
  Heart, 
  Activity, 
  Shield,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Thermometer
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Voice waveform bars component
function VoiceWaveform() {
  const bars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.7, 0.5]
  
  return (
    <div className="flex items-end justify-center gap-1 h-8">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          initial={{ height: 8 }}
          animate={{ 
            height: [8, height * 32, 8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Symptom card component
function SymptomCard({ icon: Icon, label, severity }: { 
  icon: React.ElementType
  label: string
  severity: "low" | "medium" | "high"
}) {
  const colors = {
    low: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    high: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
  }
  
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${colors[severity]}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  )
}

export default function HeroMediaFrame() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-[3rem] blur-3xl" />
      
      {/* Main phone frame */}
      <motion.div
        className="relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Phone mockup */}
        <motion.div 
          className="relative w-[280px] md:w-[320px] lg:w-[340px]"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Phone outer frame */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-2xl">
            {/* Phone inner bezel */}
            <div className="relative rounded-[2rem] bg-card overflow-hidden">
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10">
                <span className="text-[10px] font-medium text-muted-foreground">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  </div>
                  <Activity className="w-3 h-3 text-primary ml-1" />
                </div>
              </div>
              
              {/* App content */}
              <div className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">MidAi</p>
                      <p className="text-[10px] text-muted-foreground">AI Health Assistant</p>
                    </div>
                  </div>
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                
                {/* Voice input section */}
                <motion.div 
                  className="glass-card rounded-2xl p-4 space-y-3"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Mic className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">Listening...</p>
                      <p className="text-[10px] text-muted-foreground">Describe your symptoms</p>
                    </div>
                  </div>
                  <VoiceWaveform />
                  <p className="text-xs text-center text-muted-foreground italic">
                    "I have a headache and fever..."
                  </p>
                </motion.div>
                
                {/* AI Analysis Result */}
                <motion.div 
                  className="bg-muted/50 rounded-2xl p-3 space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    <p className="text-xs font-semibold">AI Analysis</p>
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-auto" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SymptomCard icon={Thermometer} label="Fever" severity="medium" />
                    <SymptomCard icon={Activity} label="Headache" severity="low" />
                  </div>
                </motion.div>
                
                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Consult Doctor</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-xs font-medium emergency-pulse"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>SOS</span>
                  </motion.button>
                </div>
              </div>
              
              {/* Bottom home indicator */}
              <div className="flex justify-center pb-2">
                <div className="w-24 h-1 rounded-full bg-muted-foreground/20" />
              </div>
            </div>
          </div>
          
          {/* Phone notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-2xl" />
        </motion.div>
      </motion.div>
      
      {/* Floating elements around the phone */}
      <motion.div
        className="absolute -top-4 -right-4 md:top-4 md:right-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <div className="glass-card rounded-2xl px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-semibold">Dr. Available</p>
              <p className="text-[10px] text-muted-foreground">Connect now</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="absolute -bottom-4 -left-4 md:bottom-8 md:left-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <div className="glass-card rounded-2xl px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold">HIPAA Secure</p>
              <p className="text-[10px] text-muted-foreground">End-to-end encrypted</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative circles */}
      <div className="absolute -z-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl top-1/4 -left-20" />
      <div className="absolute -z-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl bottom-1/4 -right-20" />
    </div>
  )
}
