"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  ArrowLeft,
  Heart,
  Sun,
  Smile,
  Meh,
  Frown,
  Wind,
  Music,
  BookOpen,
  Phone,
  MessageCircle,
  Play,
  Pause,
  Clock,
  Calendar,
  TrendingUp,
  Sparkles,
  Leaf,
  Users,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const moodOptions = [
  { icon: Smile, label: "Great", color: "bg-green-500", value: 5 },
  { icon: Smile, label: "Good", color: "bg-lime-500", value: 4 },
  { icon: Meh, label: "Okay", color: "bg-yellow-500", value: 3 },
  { icon: Frown, label: "Low", color: "bg-orange-500", value: 2 },
  { icon: Frown, label: "Struggling", color: "bg-red-500", value: 1 },
]

const quickExercises = [
  {
    id: 1,
    title: "Deep Breathing",
    duration: "5 min",
    icon: Wind,
    color: "from-blue-500 to-cyan-500",
    description: "Calm your mind with guided breathing",
  },
  {
    id: 2,
    title: "Body Scan",
    duration: "10 min",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    description: "Release tension from head to toe",
  },
  {
    id: 3,
    title: "Gratitude Journal",
    duration: "5 min",
    icon: BookOpen,
    color: "from-amber-500 to-orange-500",
    description: "Reflect on positive moments",
  },
  {
    id: 4,
    title: "Nature Sounds",
    duration: "15 min",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    description: "Relax with soothing sounds",
  },
]

const meditationSessions = [
  {
    id: 1,
    title: "Morning Calm",
    duration: "10 min",
    image: "/meditation-sunrise.jpg",
    category: "Mindfulness",
    plays: "12.5K",
  },
  {
    id: 2,
    title: "Stress Relief",
    duration: "15 min",
    image: "/meditation-forest.jpg",
    category: "Anxiety",
    plays: "8.3K",
  },
  {
    id: 3,
    title: "Sleep Better",
    duration: "20 min",
    image: "/meditation-night.jpg",
    category: "Sleep",
    plays: "15.2K",
  },
  {
    id: 4,
    title: "Focus Flow",
    duration: "12 min",
    image: "/meditation-focus.jpg",
    category: "Productivity",
    plays: "6.7K",
  },
]

const resources = [
  {
    title: "Crisis Hotline",
    description: "24/7 support when you need it most",
    icon: Phone,
    action: "Call Now",
    href: "tel:988",
    urgent: true,
  },
  {
    title: "Chat Support",
    description: "Text with a trained counselor",
    icon: MessageCircle,
    action: "Start Chat",
    href: "#",
    urgent: false,
  },
  {
    title: "Find a Therapist",
    description: "Connect with mental health professionals",
    icon: Users,
    action: "Browse",
    href: "/consultation",
    urgent: false,
  },
]

export function MentalHealth() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale")

  const weeklyMoods = [4, 3, 5, 4, 3, 4, selectedMood || 0]
  const avgMood = weeklyMoods.slice(0, 6).reduce((a, b) => a + b, 0) / 6

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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Mental Health</h1>
                <p className="text-xs text-muted-foreground">Wellness & Support</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Heart className="h-3 w-3 text-pink-500" />7 Day Streak
          </Badge>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Daily Check-in */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">How are you feeling today?</h2>
                  <p className="text-sm text-muted-foreground">Take a moment to check in with yourself</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Dec 27, 2025</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {moodOptions.map((mood) => (
                  <motion.button
                    key={mood.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                      selectedMood === mood.value
                        ? `${mood.color} text-white shadow-lg`
                        : "bg-card hover:bg-muted/50 border border-border"
                    }`}
                  >
                    <mood.icon className="h-8 w-8" />
                    <span className="text-sm font-medium">{mood.label}</span>
                  </motion.button>
                ))}
              </div>
              {selectedMood && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {selectedMood >= 4
                      ? "Wonderful! Keep nurturing your positive mindset."
                      : selectedMood === 3
                        ? "It's okay to have neutral days. Take it one step at a time."
                        : "We're here for you. Consider trying one of our calming exercises below."}
                  </p>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Weekly Mood Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Your Week
            </h2>
            <span className="text-sm text-muted-foreground">Average: {avgMood.toFixed(1)}/5</span>
          </div>
          <Card className="p-6">
            <div className="flex items-end justify-between gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative h-24 w-full">
                    <div className="absolute bottom-0 w-full rounded-t-lg bg-muted/50" style={{ height: "100%" }} />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(weeklyMoods[i] / 5) * 100}%` }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className={`absolute bottom-0 w-full rounded-t-lg ${
                        i === 6
                          ? "bg-primary"
                          : weeklyMoods[i] >= 4
                            ? "bg-green-500"
                            : weeklyMoods[i] >= 3
                              ? "bg-yellow-500"
                              : "bg-orange-500"
                      }`}
                    />
                  </div>
                  <span className={`text-xs ${i === 6 ? "font-bold text-primary" : "text-muted-foreground"}`}>
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Exercises */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Exercises
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="cursor-pointer overflow-hidden transition-all hover:border-primary hover:shadow-lg">
                  <div className={`flex h-24 items-center justify-center bg-gradient-to-br ${exercise.color}`}>
                    <exercise.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{exercise.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {exercise.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Breathing Exercise Widget */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isPlaying ? [1, 1.3, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      times: [0, 0.375, 0.5, 1],
                    }}
                    className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-background/90">
                      <span className="text-sm font-medium text-foreground">
                        {isPlaying
                          ? breathPhase === "inhale"
                            ? "Breathe In"
                            : breathPhase === "hold"
                              ? "Hold"
                              : "Breathe Out"
                          : "Start"}
                      </span>
                    </div>
                  </motion.div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="mb-2 text-xl font-bold text-foreground">Box Breathing</h3>
                  <p className="mb-4 text-muted-foreground">
                    A simple technique to reduce stress and improve focus. Inhale for 4 seconds, hold for 4 seconds,
                    exhale for 4 seconds.
                  </p>
                  <Button
                    className="gap-2"
                    onClick={() => {
                      setIsPlaying(!isPlaying)
                      if (!isPlaying) {
                        let phase = 0
                        const phases: ("inhale" | "hold" | "exhale")[] = ["inhale", "hold", "exhale"]
                        const interval = setInterval(() => {
                          phase = (phase + 1) % 3
                          setBreathPhase(phases[phase])
                        }, 4000)
                        setTimeout(() => {
                          clearInterval(interval)
                          setIsPlaying(false)
                        }, 60000)
                      }
                    }}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? "Pause" : "Start Exercise"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Meditation Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Music className="h-5 w-5 text-primary" />
              Guided Meditations
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {meditationSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Card className="cursor-pointer overflow-hidden transition-all hover:border-primary hover:shadow-lg">
                  <div className="relative aspect-video">
                    <Image
                      src={session.image || "/placeholder.svg"}
                      alt={session.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge className="mb-2 bg-white/20 text-white backdrop-blur-sm">{session.category}</Badge>
                      <h3 className="font-semibold text-white">{session.title}</h3>
                    </div>
                    <Button
                      size="icon"
                      className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Play className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {session.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Play className="h-3 w-3" />
                      {session.plays}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Resources */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Heart className="h-5 w-5 text-pink-500" />
            Support Resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <Card
                  className={`p-4 transition-all hover:shadow-lg ${resource.urgent ? "border-red-500/50 bg-red-500/5" : "hover:border-primary"}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${resource.urgent ? "bg-red-500" : "bg-primary"}`}
                    >
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{resource.title}</h3>
                      <p className="mb-3 text-sm text-muted-foreground">{resource.description}</p>
                      <Button
                        asChild
                        variant={resource.urgent ? "default" : "outline"}
                        size="sm"
                        className={resource.urgent ? "bg-red-500 hover:bg-red-600" : "bg-transparent"}
                      >
                        <Link href={resource.href}>{resource.action}</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Affirmation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-pink-500/10 p-6 text-center">
              <Sun className="mx-auto mb-4 h-10 w-10 text-amber-500" />
              <p className="mb-2 text-sm text-muted-foreground">Today's Affirmation</p>
              <p className="text-xl font-medium text-foreground italic">
                "I am worthy of love, peace, and happiness. Each day I grow stronger and more resilient."
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Repeat this 3 times today</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
