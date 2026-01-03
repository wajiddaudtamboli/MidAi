"use client"

import { AlertTriangle, MapPin, Phone, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EmergencyBanner() {
    return (
        <section className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 py-3 border-b border-destructive/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left section */}
                    <div className="flex items-center gap-3">
                        <motion.div 
                            className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                        </motion.div>
                        <div>
                            <h3 className="text-base font-bold text-destructive">Medical Emergency?</h3>
                            <p className="text-muted-foreground text-xs">24/7 AI-powered emergency response system</p>
                        </div>
                    </div>

                    {/* Right section with features and CTA */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Feature badges - hidden on mobile */}
                        <div className="items-center gap-2 text-sm text-muted-foreground lg:flex hidden">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-border">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-medium">GPS Tracking</span>
                            </div>
                        </div>
                        <div className="items-center gap-2 text-sm text-muted-foreground lg:flex hidden">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-border">
                                <Shield className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-medium">Hospital Alerts</span>
                            </div>
                        </div>
                        <div className="items-center gap-2 text-sm text-muted-foreground lg:flex hidden">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-border">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-medium">&lt;30s Response</span>
                            </div>
                        </div>
                        
                        {/* SOS Button - always visible */}
                        <Button 
                            size="default" 
                            variant="destructive" 
                            className="font-bold gap-2 min-h-[44px] px-6 emergency-pulse" 
                            asChild
                        >
                            <Link href="/emergency">
                                <Phone className="w-4 h-4" />
                                Emergency SOS
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
