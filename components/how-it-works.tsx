"use client"

import { Mic, Brain, FileText, Video } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    icon: Mic,
    title: "Describe Symptoms",
    description: "Speak or type your symptoms. MidAi understands 20+ languages including regional dialects.",
    color: "from-primary to-primary/80",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your symptoms against thousands of medical conditions.",
    color: "from-accent to-accent/80",
  },
  {
    step: "03",
    icon: FileText,
    title: "Get Recommendations",
    description: "Receive instant health guidance, possible conditions, and recommended next steps.",
    color: "from-blue-500 to-blue-600",
  },
  {
    step: "04",
    icon: Video,
    title: "Consult a Doctor",
    description: "If needed, connect with a specialist doctor through secure video consultation.",
    color: "from-purple-500 to-purple-600",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Health Guidance in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Designed to be accessible for everyone, including elderly and rural users. Get help in minutes, not hours.
          </p>
        </motion.div>

        {/* Timeline steps */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((item, index) => (
            <motion.div 
              key={item.step} 
              className="relative"
              variants={itemVariants}
            >
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative z-10 text-center group">
                {/* Step number badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background border border-border text-xs font-bold text-muted-foreground">
                  STEP {item.step}
                </div>
                
                {/* Icon container */}
                <div className={`w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                  <item.icon className="w-12 h-12 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground">
            Average response time:{" "}
            <span className="font-bold text-primary">Under 30 seconds</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
