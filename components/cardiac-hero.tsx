"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { Suspense } from "react"
import { HeartModel } from "@/components/heart-model"
import { motion } from "framer-motion"
import LiquidEther from "@/components/ui/liquid-ether"

export default function CardiacHero() {
    return (
        <section className="relative w-full h-screen bg-[#80B3D5] overflow-hidden flex flex-col items-center justify-center">
            {/* Liquid Ether Animated Background */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#80B3D5', '#A5D1FD', '#E3F2FD']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.3}
                    autoIntensity={1.8}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                    className="opacity-30"
                />
            </div>


            {/* 3D Scene */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
                    <ambientLight intensity={1.5} />
                    <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />
                    <pointLight position={[-10, -5, -5]} color="#A5D1FD" intensity={2} />

                    <Suspense fallback={null}>
                        <HeartModel />
                        <Environment preset="night" />
                        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} far={10} />
                    </Suspense>

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2.5}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>
            </div>

            {/* Hero Text Overlay */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                        Your AI <span className="text-white drop-shadow-sm">Personal</span> Health Assistant
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-800/80 mb-10 max-w-2xl mx-auto font-medium">
                        Advanced cardiac monitoring and AI-driven diagnostics at your fingertips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl">
                            Start Symptom Check
                        </button>
                        <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 rounded-full font-bold text-lg hover:bg-white/30 transition-all">
                            View Health Stats
                        </button>
                    </div>
                </motion.div>
            </div>


        </section>
    )
}
