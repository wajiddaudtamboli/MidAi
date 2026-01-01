"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  AlertTriangle,
  Activity,
  Heart,
  Brain,
  Thermometer,
  Pill,
  Stethoscope,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"

const commonSymptoms = [
  { icon: Thermometer, label: "Fever", query: "I have a fever" },
  { icon: Brain, label: "Headache", query: "I have a headache" },
  { icon: Heart, label: "Chest Pain", query: "I'm experiencing chest pain" },
  { icon: Activity, label: "Fatigue", query: "I'm feeling very tired and fatigued" },
  { icon: Pill, label: "Nausea", query: "I'm feeling nauseous" },
  { icon: Stethoscope, label: "Cough", query: "I have a persistent cough" },
]

export function SymptomChecker() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/symptom-checker",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI health assistant. I can help you understand your symptoms and provide general health guidance. Please describe what you're experiencing, and I'll do my best to help.\n\n**Important:** This is not a substitute for professional medical advice. If you're experiencing a medical emergency, please call emergency services immediately.",
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickSymptom = async (query: string) => {
    setHasStarted(true)
    await append({ role: "user", content: query })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setHasStarted(true)
      handleSubmit(e)
    }
  }

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
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">AI Symptom Checker</h1>
                <p className="text-xs text-muted-foreground">Powered by advanced AI</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Online
          </Badge>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
              <div className="text-sm">
                <p className="font-medium text-amber-600 dark:text-amber-400">Medical Disclaimer</p>
                <p className="mt-1 text-muted-foreground">
                  This AI assistant provides general health information only. It is not a substitute for professional
                  medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Symptoms */}
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="mb-3 text-sm font-medium text-muted-foreground">Common symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom, index) => (
                <motion.button
                  key={symptom.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => handleQuickSymptom(symptom.query)}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5"
                >
                  <symptom.icon className="h-4 w-4 text-primary" />
                  {symptom.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Messages */}
        <div className="mb-24 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
                    }`}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <Card
                  className={`max-w-[80%] p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card"
                    }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {message.content.split("\n").map((line, i) => (
                      <p
                        key={i}
                        className={`${i > 0 ? "mt-2" : ""} ${message.role === "user" ? "text-primary-foreground" : ""}`}
                      >
                        {line.startsWith("**") && line.endsWith("**") ? (
                          <strong>{line.slice(2, -2)}</strong>
                        ) : line.includes("**") ? (
                          <>
                            {line.split("**").map((part, j: number) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                  {message.role === "assistant" && index === messages.length - 1 && !isLoading && (
                    <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>AI-generated response</span>
                      <span className="mx-1">•</span>
                      <Clock className="h-3 w-3" />
                      <span>Just now</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Analyzing your symptoms...</span>
                </div>
              </Card>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <form onSubmit={onSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Describe your symptoms..."
                className="flex-1 rounded-full border-border bg-card px-5 py-6"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 shrink-0 rounded-full"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </form>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Press Enter to send • Your conversation is private and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
