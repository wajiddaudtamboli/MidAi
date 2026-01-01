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
    Mic,
    MicOff,
    Sparkles,
    FileText,
    Download,
} from "lucide-react"
import Link from "next/link"

const commonSymptoms = [
    { icon: Thermometer, label: "Fever", query: "I have a fever", color: "from-red-500 to-orange-500" },
    { icon: Brain, label: "Headache", query: "I have a headache", color: "from-purple-500 to-pink-500" },
    { icon: Heart, label: "Chest Pain", query: "I'm experiencing chest pain", color: "from-rose-500 to-red-600" },
    { icon: Activity, label: "Fatigue", query: "I'm feeling very tired and fatigued", color: "from-blue-500 to-cyan-500" },
    { icon: Pill, label: "Nausea", query: "I'm feeling nauseous", color: "from-green-500 to-emerald-500" },
    { icon: Stethoscope, label: "Cough", query: "I have a persistent cough", color: "from-amber-500 to-yellow-500" },
]

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp?: Date
}

export function SymptomCheckerEnhanced() {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [hasStarted, setHasStarted] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hello! I'm your AI health assistant. I can help you understand your symptoms and provide general health guidance. Please describe what you're experiencing, and I'll do my best to help.\n\n**Important:** This is not a substitute for professional medical advice. If you're experiencing a medical emergency, please call emergency services immediately.",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleQuickSymptom = async (query: string) => {
        setHasStarted(true)
        await sendMessage(query)
    }

    const sendMessage = async (messageContent: string) => {
        if (!messageContent.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: messageContent,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            // Simulate AI response - replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: generateMockResponse(messageContent),
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, aiResponse])
        } catch (error) {
            console.error("Error sending message:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const generateMockResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase()

        if (lowerQuery.includes("fever")) {
            return "Based on your symptoms of fever, here's what you should know:\n\n**Common Causes:**\n• Viral infections (flu, cold)\n• Bacterial infections\n• Heat exhaustion\n\n**Recommendations:**\n• Stay hydrated with plenty of fluids\n• Rest and monitor your temperature\n• Take over-the-counter fever reducers if needed\n\n**Seek immediate care if:**\n• Temperature exceeds 103°F (39.4°C)\n• Fever lasts more than 3 days\n• You experience severe headache or difficulty breathing\n\nWould you like to schedule a video consultation with a doctor?"
        }

        if (lowerQuery.includes("headache")) {
            return "I understand you're experiencing a headache. Let me help you understand this better:\n\n**Possible Types:**\n• Tension headache (most common)\n• Migraine\n• Cluster headache\n• Sinus headache\n\n**Self-Care Tips:**\n• Rest in a quiet, dark room\n• Apply cold or warm compress\n• Stay hydrated\n• Practice relaxation techniques\n\n**Warning Signs (seek immediate care):**\n• Sudden, severe headache\n• Headache with fever, stiff neck, or confusion\n• Headache after head injury\n\nCan you describe the type of pain and its location?"
        }

        if (lowerQuery.includes("chest pain")) {
            return "**⚠️ IMPORTANT: Chest pain can be serious.**\n\nIf you're experiencing:\n• Severe, crushing chest pain\n• Pain radiating to arm, jaw, or back\n• Shortness of breath\n• Sweating or nausea\n\n**Call emergency services (911) immediately.**\n\nFor mild chest discomfort:\n• It could be muscle strain, heartburn, or anxiety\n• Avoid strenuous activity\n• Monitor your symptoms\n\nI strongly recommend speaking with a healthcare provider right away. Would you like me to connect you with emergency services or schedule an urgent consultation?"
        }

        return "Thank you for sharing your symptoms. To provide you with the best guidance, I need a bit more information:\n\n**Please tell me:**\n• When did the symptoms start?\n• How severe are they (1-10)?\n• Any other symptoms you're experiencing?\n• Are you taking any medications?\n\nThis will help me give you more accurate recommendations. Remember, if symptoms are severe or worsening, please seek immediate medical attention."
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            setHasStarted(true)
            sendMessage(input)
        }
    }

    const toggleVoiceInput = () => {
        if (!isListening) {
            // Start voice recognition
            setIsListening(true)
            // In a real implementation, you would use the Web Speech API here
            setTimeout(() => {
                setIsListening(false)
                setInput("I have a headache and feel dizzy")
            }, 2000)
        } else {
            setIsListening(false)
        }
    }

    const downloadReport = () => {
        const reportContent = messages
            .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
            .join("\n\n")

        const blob = new Blob([reportContent], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `symptom-report-${new Date().toISOString().split("T")[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Enhanced Header */}
            <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                                <Bot className="h-5 w-5 text-primary-foreground" />
                                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold text-foreground">AI Symptom Checker</h1>
                                <p className="text-xs text-muted-foreground">Powered by advanced medical AI</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {messages.length > 1 && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 bg-transparent"
                                onClick={downloadReport}
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">Export Report</span>
                            </Button>
                        )}
                        <Badge variant="secondary" className="gap-1">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            Online
                        </Badge>
                    </div>
                </div>
            </header>

            <div className="container mx-auto max-w-4xl px-4 py-6">
                {/* Enhanced Disclaimer */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <Card className="overflow-hidden border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4">
                        <div className="flex gap-3">
                            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 animate-pulse" />
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

                {/* Quick Symptoms with Enhanced Design */}
                {!hasStarted && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <p className="text-sm font-medium text-foreground">Quick symptom check:</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {commonSymptoms.map((symptom, index) => (
                                <motion.button
                                    key={symptom.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleQuickSymptom(symptom.query)}
                                    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-lg"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${symptom.color} opacity-0 transition-opacity group-hover:opacity-10`} />
                                    <symptom.icon className="mb-2 h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                                    <span className="text-sm font-medium text-foreground">{symptom.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Chat Messages with Enhanced Styling */}
                <div className="mb-32 space-y-4">
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
                                            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
                                            : "bg-gradient-to-br from-primary/20 to-primary/10 text-primary"
                                        }`}
                                >
                                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                </div>
                                <Card
                                    className={`max-w-[85%] p-4 ${message.role === "user"
                                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/50"
                                            : "bg-card border-border/50"
                                        }`}
                                >
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        {message.content.split("\n").map((line: string, i: number) => (
                                            <p
                                                key={i}
                                                className={`${i > 0 ? "mt-2" : ""} ${message.role === "user" ? "text-primary-foreground" : ""}`}
                                            >
                                                {line.startsWith("**") && line.endsWith("**") ? (
                                                    <strong>{line.slice(2, -2)}</strong>
                                                ) : line.includes("**") ? (
                                                    <>
                                                        {line.split("**").map((part: string, j: number) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
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
                            <Card className="bg-card p-4 border-border/50">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">Analyzing your symptoms...</span>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input Form */}
                <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur-xl">
                    <div className="container mx-auto max-w-4xl px-4 py-4">
                        <form onSubmit={onSubmit} className="flex gap-3">
                            <div className="relative flex-1">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Describe your symptoms in detail..."
                                    className="rounded-full border-border bg-card px-5 py-6 pr-14 focus:border-primary"
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className={`absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full ${isListening ? "bg-red-500 text-white hover:bg-red-600" : ""
                                        }`}
                                    onClick={toggleVoiceInput}
                                    disabled={isLoading}
                                >
                                    {isListening ? <MicOff className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                size="icon"
                                className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg hover:shadow-xl transition-all"
                                disabled={isLoading || !input.trim()}
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            </Button>
                        </form>
                        <p className="mt-2 text-center text-xs text-muted-foreground">
                            Press Enter to send • Click mic for voice input • Your conversation is private and secure
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
