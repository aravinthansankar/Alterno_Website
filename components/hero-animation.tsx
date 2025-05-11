"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Float } from "@react-three/drei"

function VoiceWave({ position = [0, 0, 0], color = "#8b5cf6", height = 1 }) {
  const meshRef = useRef()

  useEffect(() => {
    if (!meshRef.current) return

    const animate = () => {
      if (!meshRef.current) return
      meshRef.current.scale.y = height + Math.sin(Date.now() * 0.003) * 0.2
      requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animate)
  }, [height])

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function WaveGroup() {
  const waves = []
  const colors = ["#8b5cf6", "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4"]

  for (let i = 0; i < 10; i++) {
    const x = (i - 5) * 0.3
    const height = 0.5 + Math.random() * 1.5
    const color = colors[i % colors.length]

    waves.push(<VoiceWave key={i} position={[x, 0, 0]} color={color} height={height} />)
  }

  return <group>{waves}</group>
}

function FloatingText() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text position={[0, -2, 0]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
        AI Voice Agents
      </Text>
    </Float>
  )
}

export default function HeroAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="night" />
        <WaveGroup />
        <FloatingText />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
