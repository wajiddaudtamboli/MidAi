"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, AlertTriangle, ArrowRight, Sparkles, Shield, Award, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

// Trust badges data
const trustBadges = [
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: Award, label: "Medical Certified" },
  { icon: CheckCircle2, label: "24/7 Available" },
]

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Premium background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Value Proposition */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Healthcare Platform
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                Your Trusted{" "}
                <span className="text-gradient">AI Healthcare</span>{" "}
                Assistant
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Get instant health guidance with voice-powered symptom checking, video consultations with certified doctors, and 24/7 emergency support.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="gap-2 text-base md:text-lg px-6 md:px-8 py-6 rounded-xl btn-premium min-h-[52px]" 
                asChild
              >
                <Link href="/symptom-checker">
                  <Mic className="w-5 h-5" />
                  Talk to MidAi
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="destructive" 
                className="gap-2 text-base md:text-lg px-6 md:px-8 py-6 rounded-xl emergency-pulse min-h-[52px]" 
                asChild
              >
                <Link href="/emergency">
                  <AlertTriangle className="w-5 h-5" />
                  Emergency SOS
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {trustBadges.map((badge, i) => (
                <div 
                  key={badge.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50"
                >
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Heart Model */}
          <motion.div 
            className="relative h-[450px] md:h-[500px] lg:h-[550px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Glow effect behind the 3D model */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl" />
            <div className="absolute inset-10 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-[80px] animate-pulse" />
            <ModelViewer />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
