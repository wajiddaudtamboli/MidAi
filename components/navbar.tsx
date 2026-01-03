"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Phone, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/consultation", label: "Consultations" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm" 
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground leading-none">MidAi</span>
            <span className="text-[10px] text-muted-foreground leading-none">Healthcare</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Emergency quick access */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
            asChild
          >
            <Link href="/emergency">
              <Phone className="w-4 h-4" />
              SOS
            </Link>
          </Button>
          
          <div className="w-px h-6 bg-border" />
          
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="font-medium">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild className="gap-1.5 font-medium">
            <Link href="/register">
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background p-0">
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-foreground leading-none">MidAi</span>
                      <span className="text-[10px] text-muted-foreground leading-none">Healthcare</span>
                    </div>
                  </div>
                </div>
                
                {/* Mobile links */}
                <div className="flex-1 p-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* Emergency SOS - prominent in mobile */}
                  <Link
                    href="/emergency"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-base font-bold text-destructive bg-destructive/10 rounded-xl mt-4"
                  >
                    <Phone className="w-4 h-4" />
                    Emergency SOS
                  </Link>
                </div>
                
                {/* Mobile footer actions */}
                <div className="p-6 border-t border-border space-y-3">
                  <Button variant="outline" asChild className="w-full h-12 text-base">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full h-12 text-base">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
