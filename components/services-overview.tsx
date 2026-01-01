"use client"

import { motion } from "framer-motion"
import { Pill, Brain, Video, Stethoscope, Search, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const services = [
    {
        title: "Symptom Checker",
        description: "AI-powered diagnosis based on your voice or text input.",
        icon: Stethoscope,
        href: "/symptom-checker",
        color: "from-blue-500 to-indigo-500",
    },
    {
        title: "Mental Health",
        description: "Personalized support, mood tracking, and meditation guides.",
        icon: Brain,
        href: "/mental-health",
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Online Pharmacy",
        description: "Order medicines with prescription OCR scanning.",
        icon: Pill,
        href: "/pharmacy",
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Video Consultation",
        description: "Connect with specialists instantly from anywhere.",
        icon: Video,
        href: "/consultation",
        color: "from-amber-500 to-orange-500",
    },
]

export default function ServicesOverview() {
    return (
        <section className="py-24 bg-card/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Innovative AI Services</h2>
                        <p className="text-lg text-muted-foreground">
                            Experience the future of healthcare with our suite of AI-driven tools designed for your convenience and safety.
                        </p>
                    </div>
                    <Link href="/features" className="text-primary font-semibold hover:underline flex items-center gap-1 mb-2">
                        View all features <Search className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={service.href}>
                                <Card className="group h-full overflow-hidden hover:border-primary transition-all duration-300">
                                    <CardContent className="p-0">
                                        <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                                        <div className="p-8">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <service.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
