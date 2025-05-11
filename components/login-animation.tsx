"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text } from "@react-three/drei"

function Particles({ count = 20 }) {
  const particles = []
  const groupRef = useRef()

  useEffect(() => {
    if (!groupRef.current) return

    const animate = () => {
      if (!groupRef.current) return

      groupRef.current.children.forEach((particle, i) => {
        const time = Date.now() * 0.001
        const offset = i * 0.1

        particle.position.x = Math.sin(time * 0.2 + offset) * 0.5 + ((i % 5) - 2.5) * 0.5
        particle.position.y = Math.cos(time * 0.2 + offset) * 0.5 + (Math.floor(i / 5) - 2) * 0.5
        particle.scale.setScalar(0.1 * (1 + Math.sin(time * 2 + offset) * 0.2))
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animate)
  }, [count])

  for (let i = 0; i < count; i++) {
    particles.push(
      <mesh key={i} position={[((i % 5) - 2) * 0.5, Math.floor(i / 5) * 0.5, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial
          color={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
          emissive={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>,
    )
  }

  return <group ref={groupRef}>{particles}</group>
}

export default function LoginAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="night" />
        <Particles count={20} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text position={[0, 0, 0]} fontSize={0.7} color="#ffffff" anchorX="center" anchorY="middle">
            Welcome Back
          </Text>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
