"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text } from "@react-three/drei"

function Rings({ count = 3 }) {
  const group = useRef()

  useEffect(() => {
    if (!group.current) return

    const animate = () => {
      if (!group.current) return

      const time = Date.now() * 0.001
      group.current.rotation.z = time * 0.1

      group.current.children.forEach((ring, i) => {
        ring.rotation.x = Math.sin(time * (0.1 + i * 0.05)) * 0.3
        ring.rotation.y = Math.cos(time * (0.1 + i * 0.05)) * 0.3
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animate)
  }, [count])

  const rings = []

  for (let i = 0; i < count; i++) {
    const scale = 1 + i * 0.5
    const color = i % 2 === 0 ? "#8b5cf6" : "#06b6d4"

    rings.push(
      <mesh key={i}>
        <torusGeometry args={[scale, 0.05, 16, 50]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>,
    )
  }

  return <group ref={group}>{rings}</group>
}

export default function SignupAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="night" />
        <Rings count={3} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text position={[0, 0, 0]} fontSize={0.7} color="#ffffff" anchorX="center" anchorY="middle">
            Join Voiceflow
          </Text>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
