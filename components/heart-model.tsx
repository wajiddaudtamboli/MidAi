"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import type * as THREE from "three"

// Lazy loaded components
let useFrame: any = null
let useGLTF: any = null
let Float: any = null
let THREELib: any = null

export function HeartModel() {
    const [isLoaded, setIsLoaded] = useState(false)
    const modelRef = useRef<THREE.Group>(null)

    useEffect(() => {
        const loadDeps = async () => {
            try {
                const [fiber, drei, three] = await Promise.all([
                    import("@react-three/fiber"),
                    import("@react-three/drei"),
                    import("three")
                ])
                useFrame = fiber.useFrame
                useGLTF = drei.useGLTF
                Float = drei.Float
                THREELib = three
                setIsLoaded(true)
            } catch (e) {
                console.error("Failed to load Three.js deps:", e)
            }
        }
        loadDeps()
    }, [])

    if (!isLoaded || !useGLTF) {
        return null
    }

    return <HeartModelInner />
}

function HeartModelInner() {
    const { scene } = useGLTF("/models/heart.glb")
    const modelRef = useRef<any>(null)

    // Clone scene to avoid shared state if used multiple times
    const clonedScene = useMemo(() => scene.clone(), [scene])

    useFrame((state: any) => {
        if (modelRef.current) {
            const time = state.clock.elapsedTime

            // Heartbeat pulse (lub-dub)
            const pulseSpeed = 4
            const lub = Math.pow(Math.sin(time * pulseSpeed), 20) * 0.15
            const dub = Math.pow(Math.sin(time * pulseSpeed - 0.6), 20) * 0.1
            const pulse = 1 + lub + dub

            modelRef.current.scale.set(pulse * 2.8, pulse * 2.8, pulse * 2.8)

            // Gentle rotation and movement
            modelRef.current.rotation.y = time * 0.3
            modelRef.current.position.y = Math.sin(time * 0.5) * 0.1 - 0.5
        }
    })

    // Apply glass material
    useMemo(() => {
        if (!THREELib) return
        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                child.material = new THREELib.MeshPhysicalMaterial({
                    color: "#E3F2FD",
                    metalness: 0,
                    roughness: 0.02,
                    transmission: 1,
                    thickness: 2,
                    ior: 1.5,
                    clearcoat: 1,
                    clearcoatRoughness: 0,
                    attenuationColor: "#BBDEFB",
                    attenuationDistance: 1,
                    transparent: true,
                    opacity: 1,
                    envMapIntensity: 2,
                })
            }
        })
    }, [clonedScene])

    if (!Float) return null

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <primitive ref={modelRef} object={clonedScene} position={[0, -0.5, 0]} />
        </Float>
    )
}
