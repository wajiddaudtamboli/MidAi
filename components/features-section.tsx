import { Mic, Video, AlertTriangle, Pill, Brain, FileText, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Mic,
    title: "Voice Symptom Checker",
    description: "Describe your symptoms by voice. Our AI analyzes them and provides instant health guidance.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Video,
    title: "Video Consultations",
    description: "Connect with certified doctors through secure video calls. Get professional advice from home.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: AlertTriangle,
    title: "Emergency SOS",
    description: "One-tap emergency alerts with live GPS location. Auto-notify contacts and nearby hospitals.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: Pill,
    title: "Medicine Delivery",
    description: "Upload prescriptions with OCR scan. Order medicines from nearby pharmacies with tracking.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Brain,
    title: "Mental Health Support",
    description: "AI-powered mood analysis and mental wellness support. Personalized stress relief suggestions.",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    icon: FileText,
    title: "Health Reports",
    description: "Download detailed PDF health reports. Track your health history and share with doctors.",
    color: "bg-chart-2/10 text-chart-2",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Complete Healthcare at Your Fingertips
          </h2>
          <p className="text-lg text-muted-foreground">
            MidAi brings together AI technology and healthcare to provide accessible, affordable, and instant medical
            assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card"
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border">
          {[
            { icon: Clock, value: "24/7", label: "Available" },
            { icon: MapPin, value: "50+", label: "Cities Covered" },
            { icon: Video, value: "500+", label: "Expert Doctors" },
            { icon: FileText, value: "99%", label: "Accuracy Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
