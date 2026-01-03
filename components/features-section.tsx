"use client"

import { Mic, Video, AlertTriangle, Pill, Brain, FileText, MapPin, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  {
    icon: Mic,
    title: "Voice Symptom Checker",
    description: "Describe your symptoms by voice. Our AI analyzes them and provides instant health guidance.",
    color: "bg-primary/10 text-primary",
    borderColor: "hover:border-primary/50",
    href: "/symptom-checker",
    priority: false,
  },
  {
    icon: Video,
    title: "Video Consultations",
    description: "Connect with certified doctors through secure video calls. Get professional advice from home.",
    color: "bg-accent/10 text-accent",
    borderColor: "hover:border-accent/50",
    href: "/consultation",
    priority: false,
  },
  {
    icon: AlertTriangle,
    title: "Emergency SOS",
    description: "One-tap emergency alerts with live GPS location. Auto-notify contacts and nearby hospitals.",
    color: "bg-destructive/10 text-destructive",
    borderColor: "border-destructive/30 hover:border-destructive/60",
    href: "/emergency",
    priority: true,
  },
  {
    icon: Pill,
    title: "Medicine Delivery",
    description: "Upload prescriptions with OCR scan. Order medicines from nearby pharmacies with tracking.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/50",
    href: "#",
    priority: false,
  },
  {
    icon: Brain,
    title: "Mental Health Support",
    description: "AI-powered mood analysis and mental wellness support. Personalized stress relief suggestions.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    borderColor: "hover:border-purple-500/50",
    href: "#",
    priority: false,
  },
  {
    icon: FileText,
    title: "Health Reports",
    description: "Download detailed PDF health reports. Track your health history and share with doctors.",
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
    borderColor: "hover:border-teal-500/50",
    href: "#",
    priority: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Complete Healthcare at Your Fingertips
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            MidAi brings together AI technology and healthcare to provide accessible, affordable, and instant medical assistance.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Link href={feature.href}>
                <Card
                  className={`group h-full transition-all duration-300 border-2 ${feature.borderColor} bg-card card-premium cursor-pointer ${
                    feature.priority ? 'ring-2 ring-destructive/20' : ''
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
                      {feature.title}
                      {feature.priority && (
                        <span className="px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-full">
                          Priority
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { icon: Clock, value: "24/7", label: "Available" },
            { icon: MapPin, value: "50+", label: "Cities Covered" },
            { icon: Video, value: "500+", label: "Expert Doctors" },
            { icon: FileText, value: "99%", label: "Accuracy Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
