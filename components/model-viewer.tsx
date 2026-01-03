"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Heart } from "lucide-react"

// Pre-loaded modules cache for faster reload
let Canvas: any = null
let OrbitControls: any = null
let useGLTF: any = null
let Environment: any = null
let Float: any = null
let useFrame: any = null
let modulesReady = false
let loadPromise: Promise<void> | null = null

// Preload modules immediately
const preloadThreeModules = () => {
  if (modulesReady || loadPromise) return loadPromise
  
  loadPromise = Promise.all([
    import("@react-three/fiber"),
    import("@react-three/drei")
  ]).then(([fiber, drei]) => {
    Canvas = fiber.Canvas
    useFrame = fiber.useFrame
    OrbitControls = drei.OrbitControls
    useGLTF = drei.useGLTF
    Environment = drei.Environment
    Float = drei.Float
    modulesReady = true
    // Preload the model
    drei.useGLTF.preload("/models/medical-model.glb")
  }).catch(e => {
    console.error("Failed to load Three.js:", e)
  })
  
  return loadPromise
}

// Start preloading when module loads
if (typeof window !== 'undefined') {
  preloadThreeModules()
}

function SimpleFallback() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <Heart className="w-32 h-32 text-primary animate-pulse" />
      </div>
    </div>
  )
}

function ThreeScene() {
  const [isLoaded, setIsLoaded] = useState(modulesReady)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (modulesReady) {
      setIsLoaded(true)
      return
    }
    
    preloadThreeModules()?.then(() => {
      if (modulesReady) setIsLoaded(true)
    }).catch(() => setHasError(true))
  }, [])

  if (hasError) {
    return <SimpleFallback />
  }

  if (!isLoaded || !Canvas) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22d3d1" />
        <Suspense fallback={
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#0d9488" wireframe />
          </mesh>
        }>
          <MedicalModelInner />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

function MedicalModelInner() {
  const modelRef = useRef<any>(null)
  const { scene } = useGLTF("/models/medical-model.glb")

  useFrame((state: any) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive ref={modelRef} object={scene} scale={2.5} position={[0, -0.5, 0]} />
    </Float>
  )
}

export default function ModelViewer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <SimpleFallback />
  }

  return <ThreeScene />
}
