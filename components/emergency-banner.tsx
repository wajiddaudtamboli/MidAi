"use client"

import { motion } from "framer-motion"
import { AlertTriangle, MapPin, Phone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmergencyBanner() {
    return (
        <section className="bg-destructive/10 py-6 border-y border-destructive/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-destructive">Medical Emergency?</h3>
                            <p className="text-muted-foreground text-sm">Our AI-powered SOS system is ready to help 24/7.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mr-4 hidden lg:flex">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>Real-time GPS Tracking</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mr-4 hidden lg:flex">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Nearby Hospital Alerts</span>
                        </div>
                        <Button size="lg" variant="destructive" className="font-bold gap-2 px-8" asChild>
                            <Link href="/emergency">
                                <Phone className="w-5 h-5" />
                                Trigger Emergency SOS
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
