"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface BentoCardProps {
    name: string
    className?: string
    background?: ReactNode
    Icon?: React.ElementType
    description?: string
    href?: string
    cta?: string
    children?: ReactNode
    onClick?: () => void
}

export function BentoCard({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    children,
    onClick,
}: BentoCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative col-span-1 flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl",
                "bg-card border border-border/50",
                "transform-gpu transition-all duration-300",
                "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
                className,
            )}
        >
            {/* Background Effect */}
            <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300">{background}</div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col p-4">{children}</div>

            {/* Bottom CTA Bar */}
            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center border-t border-border/50 bg-card/80 p-4 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                )}
            >
                {cta && (
                    <Button variant="ghost" size="sm" className="pointer-events-auto gap-1">
                        {cta}
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                )}
            </div>

            {/* Hover Gradient Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
    )
}

export function BentoGrid({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn("grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
            {children}
        </div>
    )
}
