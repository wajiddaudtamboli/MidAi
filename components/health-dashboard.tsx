"use client"

import { motion } from "framer-motion"
import { Activity, Heart, Flame, Footprints, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
    {
        title: "Heart Rate",
        value: "72",
        unit: "BPM",
        status: "Normal",
        icon: Heart,
        color: "text-red-500",
        bg: "bg-red-50",
    },
    {
        title: "Activity",
        value: "8,432",
        unit: "Steps",
        status: "+12%",
        icon: Footprints,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        title: "Calories",
        value: "1,240",
        unit: "kcal",
        status: "Target 2k",
        icon: Flame,
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    {
        title: "Health Score",
        value: "94",
        unit: "/100",
        status: "Excellent",
        icon: Activity,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
]

export default function HealthDashboard() {
    return (
        <section className="py-12 -mt-20 relative z-30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md hover:shadow-2xl transition-all group cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                            {stat.status} <ArrowUpRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                        <div className="flex items-baseline gap-1">
                                            <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
                                            <span className="text-sm font-medium text-slate-400">{stat.unit}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
