import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Mother of 2",
    content:
      "MidAi helped me understand my child's symptoms at 2 AM. The voice feature made it so easy to use while holding my baby.",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Senior Citizen",
    content:
      "I can finally get medical advice without traveling to the city. The large buttons and voice support are perfect for my age.",
    rating: 5,
  },
  {
    name: "Dr. Ananya Patel",
    role: "General Physician",
    content:
      "As a doctor, I recommend MidAi to my patients for initial consultations. It helps them understand when to seek emergency care.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Trusted by Thousands</h2>
          <p className="text-lg text-muted-foreground">See what our users say about their experience with MidAi</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative overflow-hidden bg-card border-border/50">
              <CardContent className="pt-8 pb-6">
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-chart-3 text-chart-3" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
