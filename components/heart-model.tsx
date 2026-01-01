"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Float } from "@react-three/drei"
import * as THREE from "three"

export function HeartModel() {
    const { scene } = useGLTF("/models/heart.glb")
    const modelRef = useRef<THREE.Group>(null)

    // Clone scene to avoid shared state if used multiple times
    const clonedScene = useMemo(() => scene.clone(), [scene])

    useFrame((state) => {
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
        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                mesh.material = new THREE.MeshPhysicalMaterial({
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

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <primitive ref={modelRef} object={clonedScene} position={[0, -0.5, 0]} />
        </Float>
    )
}
