"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BentoCard, BentoGrid } from "@/components/ui/bento-card"
import {
  Video,
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Search,
  Filter,
  Heart,
  Brain,
  Eye,
  Baby,
  Bone,
  Stethoscope,
  Shield,
  CheckCircle2,
  MapPin,
  Languages,
  GraduationCap,
  Phone,
  MessageSquare,
  X,
  Sparkles,
  Activity,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

function PulseRings({ color = "primary" }: { color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-${color}/20`}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 2 + i, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

function HeartbeatLine() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-30">
      <svg viewBox="0 0 400 100" className="h-full w-full">
        <motion.path
          d="M0,50 L50,50 L70,20 L90,80 L110,50 L130,50 L150,30 L170,70 L190,50 L400,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </svg>
    </div>
  )
}

function GridPattern() {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  )
}

function GlowOrb({ color = "primary" }: { color?: string }) {
  return (
    <motion.div
      className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-${color}/20 blur-3xl`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
    />
  )
}

function DoctorBackground({ specialty }: { specialty: string }) {
  switch (specialty) {
    case "cardiology":
      return (
        <>
          <HeartbeatLine />
          <GlowOrb color="red" />
          <div className="absolute right-4 top-4 opacity-10">
            <Heart className="h-24 w-24" />
          </div>
        </>
      )
    case "neurology":
      return (
        <>
          <FloatingParticles />
          <GlowOrb color="purple" />
          <div className="absolute right-4 top-4 opacity-10">
            <Brain className="h-24 w-24" />
          </div>
        </>
      )
    case "ophthalmology":
      return (
        <>
          <PulseRings color="blue" />
          <GlowOrb color="blue" />
          <div className="absolute right-4 top-4 opacity-10">
            <Eye className="h-24 w-24" />
          </div>
        </>
      )
    case "pediatrics":
      return (
        <>
          <FloatingParticles />
          <GlowOrb color="pink" />
          <div className="absolute right-4 top-4 opacity-10">
            <Baby className="h-24 w-24" />
          </div>
        </>
      )
    case "orthopedics":
      return (
        <>
          <GridPattern />
          <GlowOrb color="orange" />
          <div className="absolute right-4 top-4 opacity-10">
            <Bone className="h-24 w-24" />
          </div>
        </>
      )
    default:
      return (
        <>
          <PulseRings />
          <GlowOrb />
          <div className="absolute right-4 top-4 opacity-10">
            <Stethoscope className="h-24 w-24" />
          </div>
        </>
      )
  }
}

const specialties = [
  { id: "all", label: "All Doctors", icon: Stethoscope },
  { id: "general", label: "General", icon: Stethoscope },
  { id: "cardiology", label: "Cardiology", icon: Heart },
  { id: "neurology", label: "Neurology", icon: Brain },
  { id: "ophthalmology", label: "Eye Care", icon: Eye },
  { id: "pediatrics", label: "Pediatrics", icon: Baby },
  { id: "orthopedics", label: "Orthopedics", icon: Bone },
]

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    specialtyId: "cardiology",
    image: "/professional-female-doctor-portrait-asian.jpg",
    rating: 4.9,
    reviews: 324,
    experience: "15 years",
    nextAvailable: "Today, 2:30 PM",
    price: 75,
    languages: ["English", "Mandarin"],
    education: "Harvard Medical School",
    verified: true,
    online: true,
    featured: true,
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    specialty: "General Medicine",
    specialtyId: "general",
    image: "/professional-male-doctor.png",
    rating: 4.8,
    reviews: 512,
    experience: "12 years",
    nextAvailable: "Today, 4:00 PM",
    price: 60,
    languages: ["English", "Spanish"],
    education: "Johns Hopkins University",
    verified: true,
    online: true,
    featured: false,
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "Pediatrics",
    specialtyId: "pediatrics",
    image: "/professional-female-doctor-portrait-blonde.jpg",
    rating: 4.9,
    reviews: 287,
    experience: "10 years",
    nextAvailable: "Tomorrow, 9:00 AM",
    price: 65,
    languages: ["English"],
    education: "Stanford University",
    verified: true,
    online: false,
    featured: true,
  },
  {
    id: 4,
    name: "Dr. James Park",
    specialty: "Neurology",
    specialtyId: "neurology",
    image: "/professional-male-doctor-portrait-korean.jpg",
    rating: 4.7,
    reviews: 198,
    experience: "18 years",
    nextAvailable: "Today, 5:30 PM",
    price: 90,
    languages: ["English", "Korean"],
    education: "Yale School of Medicine",
    verified: true,
    online: true,
    featured: false,
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    specialty: "Ophthalmology",
    specialtyId: "ophthalmology",
    image: "/professional-female-doctor-portrait-indian.jpg",
    rating: 4.8,
    reviews: 156,
    experience: "8 years",
    nextAvailable: "Tomorrow, 11:00 AM",
    price: 70,
    languages: ["English", "Hindi"],
    education: "Columbia University",
    verified: true,
    online: false,
    featured: false,
  },
  {
    id: 6,
    name: "Dr. David Miller",
    specialty: "Orthopedics",
    specialtyId: "orthopedics",
    image: "/professional-male-doctor-portrait-senior.jpg",
    rating: 4.9,
    reviews: 423,
    experience: "20 years",
    nextAvailable: "Today, 6:00 PM",
    price: 85,
    languages: ["English", "German"],
    education: "UCLA Medical Center",
    verified: true,
    online: true,
    featured: true,
  },
]

export function VideoConsultation() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [bookingStep, setBookingStep] = useState<"details" | "time" | "confirm" | null>(null)
  const [hoveredDoctor, setHoveredDoctor] = useState<number | null>(null)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialtyId === selectedSpecialty
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSpecialty && matchesSearch
  })

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                <Video className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Video Consultation</h1>
                <p className="text-xs text-muted-foreground">Connect with certified doctors</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Shield className="h-3 w-3" />
            HIPAA Compliant
          </Badge>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </motion.div>

        {/* Specialty Tabs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Tabs value={selectedSpecialty} onValueChange={setSelectedSpecialty} className="mb-6">
            <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              {specialties.map((specialty) => (
                <TabsTrigger
                  key={specialty.id}
                  value={specialty.id}
                  className="gap-2 rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <specialty.icon className="h-4 w-4" />
                  {specialty.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Online Now Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="relative overflow-hidden border-green-500/30 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent p-6">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {doctors.filter((d) => d.online).length} Doctors Online Now
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="h-3 w-3 rounded-full bg-green-500"
                  />
                </div>
                <p className="text-muted-foreground">Average wait time: 5 minutes</p>
              </div>
              <Button size="lg" className="gap-2 bg-green-500 shadow-lg shadow-green-500/30 hover:bg-green-600">
                <Zap className="h-5 w-5" />
                Instant Consult
              </Button>
            </div>
          </Card>
        </motion.div>

        <BentoGrid className="auto-rows-[24rem] lg:grid-cols-3">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className={doctor.featured ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <BentoCard
                name={doctor.name}
                cta="Book Consultation"
                onClick={() => {
                  setSelectedDoctor(doctor)
                  setBookingStep("details")
                }}
                className="h-full"
                background={<DoctorBackground specialty={doctor.specialtyId} />}
              >
                <div
                  className="flex h-full flex-col"
                  onMouseEnter={() => setHoveredDoctor(doctor.id)}
                  onMouseLeave={() => setHoveredDoctor(null)}
                >
                  {/* Top Section: Status Badges */}
                  <div className="mb-4 flex items-center justify-between">
                    {doctor.online ? (
                      <Badge className="gap-1.5 bg-green-500/90 text-white backdrop-blur-sm">
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          className="h-2 w-2 rounded-full bg-white"
                        />
                        Online Now
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        <Clock className="mr-1 h-3 w-3" />
                        {doctor.nextAvailable}
                      </Badge>
                    )}
                    {doctor.featured && (
                      <Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Doctor Profile */}
                  <div className="mb-4 flex gap-4">
                    <motion.div
                      className="relative h-20 w-20 shrink-0"
                      animate={hoveredDoctor === doctor.id ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/50 to-primary/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                      <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-background shadow-lg">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      {doctor.verified && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-lg"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {doctor.name}
                      </h3>
                      <p className="font-medium text-primary">{doctor.specialty}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                            {doctor.rating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 backdrop-blur-sm">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <div className="text-xs">
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-semibold text-foreground">{doctor.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 backdrop-blur-sm">
                      <Languages className="h-4 w-4 text-primary" />
                      <div className="text-xs">
                        <p className="text-muted-foreground">Languages</p>
                        <p className="font-semibold text-foreground">{doctor.languages[0]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section: Price & Actions */}
                  <div className="mt-auto flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/5 to-transparent p-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">${doctor.price}</span>
                        <span className="text-xs text-muted-foreground">/session</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </BentoGrid>
      </div>

      {/* Doctor Details & Booking Modal */}
      <AnimatePresence>
        {selectedDoctor && bookingStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 sm:items-center"
            onClick={() => {
              setSelectedDoctor(null)
              setBookingStep(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-t-2xl sm:rounded-2xl"
            >
              <Card className="overflow-hidden">
                {/* Doctor Header */}
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6">
                  <div className="absolute inset-0 opacity-30">
                    <DoctorBackground specialty={selectedDoctor.specialtyId} />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 z-10"
                    onClick={() => {
                      setSelectedDoctor(null)
                      setBookingStep(null)
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="relative flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl shadow-xl">
                      <Image
                        src={selectedDoctor.image || "/placeholder.svg"}
                        alt={selectedDoctor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-foreground">{selectedDoctor.name}</h3>
                        {selectedDoctor.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      <p className="text-primary">{selectedDoctor.specialty}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedDoctor.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedDoctor.reviews} reviews)</span>
                      </div>
                      {selectedDoctor.online && (
                        <Badge className="mt-2 gap-1 bg-green-500 text-white">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                          Available Now
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {bookingStep === "details" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {/* Info Grid */}
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Experience</p>
                            <p className="font-medium">{selectedDoctor.experience}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <Languages className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Languages</p>
                            <p className="font-medium">{selectedDoctor.languages.join(", ")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Education</p>
                            <p className="text-sm font-medium">{selectedDoctor.education}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Consultation</p>
                            <p className="font-medium">${selectedDoctor.price}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button className="w-full gap-2" size="lg" onClick={() => setBookingStep("time")}>
                          <Calendar className="h-5 w-5" />
                          Book Appointment
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="gap-2 bg-transparent">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </Button>
                          <Button variant="outline" className="gap-2 bg-transparent">
                            <Phone className="h-4 w-4" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === "time" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h4 className="mb-4 font-semibold text-foreground">Select Time Slot</h4>
                      <p className="mb-4 text-sm text-muted-foreground">Today, December 28, 2025</p>
                      <div className="mb-6 grid grid-cols-3 gap-2">
                        {timeSlots.map((slot, i) => (
                          <Button
                            key={slot}
                            variant={i === 3 ? "default" : "outline"}
                            className={i !== 3 ? "bg-transparent" : ""}
                            onClick={() => setBookingStep("confirm")}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full" onClick={() => setBookingStep("details")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    </motion.div>
                  )}

                  {bookingStep === "confirm" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10 }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30"
                      >
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </motion.div>
                      <h4 className="mb-2 text-xl font-bold text-foreground">Booking Confirmed!</h4>
                      <p className="mb-6 text-muted-foreground">
                        Your appointment with {selectedDoctor.name} is scheduled for Today at 10:30 AM.
                      </p>
                      <Card className="mb-6 bg-muted/50 p-4 text-left">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{selectedDoctor.name}</p>
                            <p className="text-sm text-muted-foreground">Dec 28, 2025 - 10:30 AM</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">${selectedDoctor.price}</p>
                            <p className="text-xs text-muted-foreground">Video Call</p>
                          </div>
                        </div>
                      </Card>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setSelectedDoctor(null)
                          setBookingStep(null)
                        }}
                      >
                        Done
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
