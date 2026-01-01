import { Mic, Brain, FileText, Video } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Mic,
    title: "Describe Symptoms",
    description: "Speak or type your symptoms. MidAi understands 20+ languages including regional dialects.",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your symptoms against thousands of medical conditions.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Get Recommendations",
    description: "Receive instant health guidance, possible conditions, and recommended next steps.",
  },
  {
    step: "04",
    icon: Video,
    title: "Consult a Doctor",
    description: "If needed, connect with a specialist doctor through secure video consultation.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">How MidAi Works</h2>
          <p className="text-lg text-muted-foreground">
            Get health guidance in four simple steps. Designed to be accessible for everyone, including elderly and
            rural users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center group hover:bg-primary hover:scale-105 transition-all duration-300">
                  <item.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
