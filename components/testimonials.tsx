"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, BadgeCheck, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Mother of 2",
    location: "Mumbai",
    content:
      "MidAi helped me understand my child's symptoms at 2 AM. The voice feature made it so easy to use while holding my baby. The AI was accurate and calming.",
    rating: 5,
    verified: true,
    avatar: "PS",
  },
  {
    name: "Rajesh Kumar",
    role: "Senior Citizen, Age 68",
    location: "Delhi",
    content:
      "I can finally get medical advice without traveling to the city. The large buttons and voice support are perfect for my age. My whole family now uses MidAi.",
    rating: 5,
    verified: true,
    avatar: "RK",
  },
  {
    name: "Dr. Ananya Patel",
    role: "General Physician",
    location: "Bangalore",
    content:
      "As a doctor, I recommend MidAi to my patients for initial consultations. It helps them understand when to seek emergency care vs routine check-ups.",
    rating: 5,
    verified: true,
    avatar: "AP",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See what our users say about their experience with MidAi. Real stories from real people.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="relative overflow-hidden bg-card border-border h-full card-premium">
                {/* Quote decoration */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary/30" />
                </div>
                
                <CardContent className="pt-8 pb-6 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <p className="text-foreground mb-6 leading-relaxed flex-1">
                    &quot;{testimonial.content}&quot;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-foreground">{testimonial.name}</span>
                        {testimonial.verified && (
                          <BadgeCheck className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust stats */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">10,000+</div>
            <div className="text-sm text-muted-foreground">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">50,000+</div>
            <div className="text-sm text-muted-foreground">Consultations</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
