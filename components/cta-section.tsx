"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, ArrowRight, Shield, Clock, Heart, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-accent p-8 md:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle2 className="w-4 h-4" />
              Free to Start • No Credit Card Required
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Start Your Health Journey Today
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of users who trust MidAi for their healthcare needs. Get instant access to AI-powered
              health guidance anytime, anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2 text-base md:text-lg px-8 py-6 rounded-xl btn-premium min-h-[52px] bg-white text-primary hover:bg-white/90" 
                asChild
              >
                <Link href="/symptom-checker">
                  <Mic className="w-5 h-5" />
                  Start Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/90">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">500+ Doctors</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
