"use client"

import { ShieldCheck, Lock, Eye, FileCheck, Award, BadgeCheck, Fingerprint, Server } from "lucide-react"
import { motion } from "framer-motion"

const trustItems = [
    {
        icon: ShieldCheck,
        title: "HIPAA Compliant",
        description: "Your health data is protected by industry-standard HIPAA regulations.",
        badge: "Certified",
    },
    {
        icon: Lock,
        title: "End-to-End Encryption",
        description: "All communications between you and our AI/doctors are AES-256 encrypted.",
        badge: "SSL/TLS",
    },
    {
        icon: Eye,
        title: "Privacy First",
        description: "We never sell your personal health information to third parties.",
        badge: "GDPR",
    },
    {
        icon: FileCheck,
        title: "Medical Oversight",
        description: "Our AI models are reviewed by board-certified medical professionals.",
        badge: "Verified",
    },
]

const certifications = [
    { name: "HIPAA", icon: ShieldCheck },
    { name: "SOC 2", icon: Server },
    { name: "GDPR", icon: Eye },
    { name: "ISO 27001", icon: Award },
]

const doctors = [
    { name: "Dr. Ananya Patel", specialty: "General Medicine", verified: true },
    { name: "Dr. Rajesh Kumar", specialty: "Cardiology", verified: true },
    { name: "Dr. Priya Sharma", specialty: "Pediatrics", verified: true },
    { name: "Dr. Vikram Singh", specialty: "Emergency", verified: true },
]

export default function TrustSection() {
    return (
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <motion.div 
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Security & Trust
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                        Your Health Privacy is Our Priority
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        We use the latest security technologies and follow strict medical guidelines to ensure your experience is safe and private.
                    </p>
                </motion.div>

                {/* Trust cards */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {trustItems.map((item, index) => (
                        <motion.div 
                            key={item.title} 
                            className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border card-premium group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Badge */}
                            <span className="absolute -top-3 right-4 px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                                {item.badge}
                            </span>
                            
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Certifications bar */}
                <motion.div 
                    className="flex flex-wrap justify-center items-center gap-8 py-6 px-6 rounded-2xl bg-muted/50 border border-border mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className="text-sm font-medium text-muted-foreground">Certified by:</span>
                    {certifications.map((cert) => (
                        <div key={cert.name} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border">
                            <cert.icon className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-sm">{cert.name}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Verified doctors section */}
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h3 className="text-xl font-bold mb-6 flex items-center justify-center gap-2">
                        <BadgeCheck className="w-5 h-5 text-primary" />
                        Verified Healthcare Professionals
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {doctors.map((doctor, index) => (
                            <div 
                                key={doctor.name}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary">
                                    {doctor.name.charAt(4)}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-semibold">{doctor.name}</span>
                                        {doctor.verified && (
                                            <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{doctor.specialty}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
