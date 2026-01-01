"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pill,
  ArrowLeft,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Clock,
  Shield,
  Tag,
  X,
  Upload,
  FileText,
  CheckCircle2,
  Star,
  Package,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { id: "all", label: "All" },
  { id: "prescription", label: "Prescription" },
  { id: "otc", label: "Over the Counter" },
  { id: "vitamins", label: "Vitamins" },
  { id: "first-aid", label: "First Aid" },
  { id: "personal", label: "Personal Care" },
]

const medicines = [
  {
    id: 1,
    name: "Ibuprofen 200mg",
    brand: "Advil",
    category: "otc",
    image: "/ibuprofen-tablets.jpg",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    prescription: false,
    description: "Pain reliever and fever reducer",
    quantity: "100 tablets",
  },
  {
    id: 2,
    name: "Vitamin D3 1000IU",
    brand: "Nature Made",
    category: "vitamins",
    image: "/vitamin-d3-bottle.jpg",
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.9,
    reviews: 2156,
    inStock: true,
    prescription: false,
    description: "Supports bone and immune health",
    quantity: "200 softgels",
  },
  {
    id: 3,
    name: "Amoxicillin 500mg",
    brand: "Generic",
    category: "prescription",
    image: "/amoxicillin-capsules.jpg",
    price: 24.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviews: 856,
    inStock: true,
    prescription: true,
    description: "Antibiotic for bacterial infections",
    quantity: "30 capsules",
  },
  {
    id: 4,
    name: "First Aid Kit",
    brand: "MediCare+",
    category: "first-aid",
    image: "/first-aid-kit.jpg",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 678,
    inStock: true,
    prescription: false,
    description: "Complete emergency first aid kit",
    quantity: "100 pieces",
  },
  {
    id: 5,
    name: "Omega-3 Fish Oil",
    brand: "Nordic Naturals",
    category: "vitamins",
    image: "/omega3-fish-oil.jpg",
    price: 32.99,
    originalPrice: 38.99,
    rating: 4.8,
    reviews: 1567,
    inStock: true,
    prescription: false,
    description: "Heart and brain health support",
    quantity: "120 softgels",
  },
  {
    id: 6,
    name: "Acetaminophen 500mg",
    brand: "Tylenol",
    category: "otc",
    image: "/acetaminophen-tablets.jpg",
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.7,
    reviews: 2345,
    inStock: true,
    prescription: false,
    description: "Pain reliever and fever reducer",
    quantity: "100 caplets",
  },
]

type CartItem = {
  medicine: (typeof medicines)[0]
  quantity: number
}

export function MedicineDelivery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showPrescription, setShowPrescription] = useState(false)

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (medicine: (typeof medicines)[0]) => {
    if (medicine.prescription) {
      setShowPrescription(true)
      return
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id)
      if (existing) {
        return prev.map((item) => (item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { medicine, quantity: 1 }]
    })
  }

  const updateQuantity = (medicineId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.medicine.id === medicineId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background pb-24">
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
                <Pill className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Pharmacy</h1>
                <p className="text-xs text-muted-foreground">Medicine Delivery</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="relative gap-2 bg-transparent" onClick={() => setShowCart(true)}>
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-6">
        {/* Delivery Banner */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Free Delivery on Orders $35+</p>
                  <p className="text-sm text-muted-foreground">Same-day delivery available</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>2-4 hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Licensed Pharmacy</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search medicines, vitamins, or health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card pl-10"
            />
          </div>
        </motion.div>

        {/* Upload Prescription */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Card
            className="cursor-pointer border-dashed border-primary/50 bg-primary/5 p-4 transition-all hover:border-primary hover:bg-primary/10"
            onClick={() => setShowPrescription(true)}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Upload Prescription</p>
                <p className="text-sm text-muted-foreground">
                  Upload your prescription to order prescription medicines
                </p>
              </div>
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </Card>
        </motion.div>

        {/* Categories */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="overflow-hidden transition-all hover:border-primary hover:shadow-lg">
                <div className="relative aspect-square bg-muted/30 p-4">
                  {medicine.originalPrice > medicine.price && (
                    <Badge className="absolute left-2 top-2 gap-1 bg-red-500">
                      <Tag className="h-3 w-3" />
                      {Math.round((1 - medicine.price / medicine.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  {medicine.prescription && (
                    <Badge variant="secondary" className="absolute right-2 top-2">
                      Rx Required
                    </Badge>
                  )}
                  <Image
                    src={medicine.image || "/placeholder.svg"}
                    alt={medicine.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary">{medicine.brand}</p>
                  <h3 className="font-semibold text-foreground">{medicine.name}</h3>
                  <p className="text-sm text-muted-foreground">{medicine.quantity}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{medicine.rating}</span>
                    <span className="text-xs text-muted-foreground">({medicine.reviews})</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">${medicine.price}</span>
                      {medicine.originalPrice > medicine.price && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${medicine.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="gap-1" onClick={() => addToCart(medicine)}>
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Summary Bar */}
      {cartCount > 0 && !showCart && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 p-4 backdrop-blur-xl"
        >
          <div className="container mx-auto flex max-w-6xl items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{cartCount} items in cart</p>
              <p className="text-xl font-bold text-foreground">${cartTotal.toFixed(2)}</p>
            </div>
            <Button size="lg" className="gap-2" onClick={() => setShowCart(true)}>
              <ShoppingCart className="h-5 w-5" />
              View Cart
            </Button>
          </div>
        </motion.div>
      )}

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 sm:items-center sm:p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-t-2xl bg-background sm:rounded-2xl"
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background p-4">
                <h3 className="text-lg font-bold text-foreground">Your Cart ({cartCount})</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-border p-4">
                    {cart.map((item) => (
                      <div key={item.medicine.id} className="flex items-center gap-4 py-4">
                        <div className="relative h-16 w-16 shrink-0 rounded-lg bg-muted/50">
                          <Image
                            src={item.medicine.image || "/placeholder.svg"}
                            alt={item.medicine.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.medicine.name}</p>
                          <p className="text-sm text-muted-foreground">{item.medicine.quantity}</p>
                          <p className="font-semibold text-primary">${item.medicine.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.medicine.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.medicine.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border p-4">
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className={cartTotal >= 35 ? "text-green-500" : ""}>
                          {cartTotal >= 35 ? "FREE" : "$4.99"}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${(cartTotal + (cartTotal >= 35 ? 0 : 4.99)).toFixed(2)}</span>
                      </div>
                    </div>

                    <Card className="mb-4 flex items-center gap-3 bg-green-500/10 p-3">
                      <Zap className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Express Delivery</p>
                        <p className="text-xs text-muted-foreground">Get it in 2-4 hours</p>
                      </div>
                      <Badge className="bg-green-500">+$5.99</Badge>
                    </Card>

                    <Button className="w-full gap-2" size="lg">
                      <Package className="h-5 w-5" />
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prescription Upload Modal */}
      <AnimatePresence>
        {showPrescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowPrescription(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="max-w-md p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Upload Prescription</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowPrescription(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mb-6 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 p-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <p className="mb-2 font-medium text-foreground">Drop your prescription here</p>
                  <p className="mb-4 text-sm text-muted-foreground">or click to browse files</p>
                  <Button variant="outline" className="bg-transparent">
                    Select File
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <p className="text-muted-foreground">Accepted formats: JPG, PNG, PDF</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <p className="text-muted-foreground">Prescription must be valid and not expired</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <p className="text-muted-foreground">Our pharmacist will verify within 30 minutes</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
