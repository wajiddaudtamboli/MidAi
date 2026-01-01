"use client"

import { ShieldCheck, Lock, Eye, FileCheck } from "lucide-react"

const trustItems = [
    {
        icon: ShieldCheck,
        title: "HIPAA Compliant",
        description: "Your health data is protected by industry-standard regulations.",
    },
    {
        icon: Lock,
        title: "End-to-End Encryption",
        description: "All communications between you and our AI/doctors are secure.",
    },
    {
        icon: Eye,
        title: "Privacy First",
        description: "We never sell your personal health information to third parties.",
    },
    {
        icon: FileCheck,
        title: "Medical Oversight",
        description: "Our AI models are reviewed by board-certified medical professionals.",
    },
]

export default function TrustSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Your Health Privacy is Our Priority</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We use the latest security technologies and follow strict medical guidelines to ensure your experience is safe and private.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustItems.map((item) => (
                        <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 transition-colors hover:bg-muted">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
