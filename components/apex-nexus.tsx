"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Html, PerspectiveCamera, Cloud } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { HolographicDisplay } from "./holographic-display"
import { TalkingOrb } from "./talking-orb"
import { LifeConstellation } from "./life-constellation"
import { SynergyStream } from "./synergy-stream"
import { Button } from "./ui/button"
import { Sparkles, Network } from "lucide-react"

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#FF6B00"
          emissive="#FF6B00"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
        {/* Outer glow */}
        <mesh scale={1.2}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.2} />
        </mesh>
      </mesh>
      {/* Pulsing light */}
      <pointLight color="#FF6B00" intensity={2} distance={10} decay={2} />
    </Float>
  )
}

function FinancialGuildSatellite({
  position,
  onClick,
}: {
  position: [number, number, number]
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.3}>
      <group position={position}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          rotation={[0.5, 0.5, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={hovered ? 1.2 : 0.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        {hovered && (
          <Html center distanceFactor={8}>
            <div className="bg-black/80 backdrop-blur-sm border border-[#FFD700] px-4 py-2 rounded-lg text-[#FFD700] font-semibold whitespace-nowrap cursor-pointer">
              Financial Guild - Click to explore
            </div>
          </Html>
        )}
        <pointLight color="#FFD700" intensity={hovered ? 1.5 : 0.8} distance={5} />
      </group>
    </Float>
  )
}

function WellnessGuildSatellite({
  position,
  auraColor,
  onClick,
}: {
  position: [number, number, number]
  auraColor: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
      <group position={position}>
        <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={onClick}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={auraColor}
            emissive={auraColor}
            emissiveIntensity={hovered ? 1.5 : 0.8}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        {hovered && (
          <Html center distanceFactor={8}>
            <div
              className="bg-black/80 backdrop-blur-sm border px-4 py-2 rounded-lg font-semibold whitespace-nowrap cursor-pointer"
              style={{ borderColor: auraColor, color: auraColor }}
            >
              Wellness Guild - Click to explore
            </div>
          </Html>
        )}
        <pointLight color={auraColor} intensity={hovered ? 1.5 : 1} distance={5} />
      </group>
    </Float>
  )
}

function CareerGuildSatellite({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          rotation={[0, Math.PI / 4, 0]}
        >
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#00D9FF"
            emissive="#00D9FF"
            emissiveIntensity={hovered ? 1.3 : 0.6}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>
        {hovered && (
          <Html center distanceFactor={8}>
            <div className="bg-black/80 backdrop-blur-sm border border-[#00D9FF] px-4 py-2 rounded-lg text-[#00D9FF] font-semibold whitespace-nowrap cursor-pointer">
              Career Guild - Click to explore
            </div>
          </Html>
        )}
        <pointLight color="#00D9FF" intensity={hovered ? 1.5 : 0.8} distance={5} />
      </group>
    </Float>
  )
}

function Scene({
  onGuildClick,
}: {
  onGuildClick: (guild: "financial" | "wellness" | "career") => void
}) {
  return (
    <>
      {/* Dynamic starfield background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Ambient nebula clouds */}
      <Cloud opacity={0.1} speed={0.2} width={10} depth={1.5} segments={20} color="#FF6B00" />
      <Cloud opacity={0.08} speed={0.3} width={12} depth={2} segments={25} position={[5, 2, -5]} color="#9333EA" />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Central Cosmic Orb */}
      <CentralOrb />

      {/* Guild Satellites orbiting the central orb */}
      <FinancialGuildSatellite position={[5, 1, 0]} onClick={() => onGuildClick("financial")} />
      <WellnessGuildSatellite position={[-4, -1, 3]} auraColor="#10B981" onClick={() => onGuildClick("wellness")} />
      <CareerGuildSatellite position={[0, 3, -5]} onClick={() => onGuildClick("career")} />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function ApexNexus() {
  const [selectedGuild, setSelectedGuild] = useState<"financial" | "wellness" | "career" | null>(null)
  const [showConstellation, setShowConstellation] = useState(false)
  const [showSynergyStream, setShowSynergyStream] = useState(false)

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={75} />
        <Suspense fallback={null}>
          <Scene onGuildClick={setSelectedGuild} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-md border border-[#FF6B00]/30 rounded-lg px-6 py-4"
        >
          <h1 className="text-2xl font-bold text-white mb-1">Apex Nexus</h1>
          <p className="text-sm text-gray-400">Your Life OS in 3D Space</p>
        </motion.div>
      </div>

      {/* Experience buttons */}
      <div className="absolute top-8 right-8 z-10 flex flex-col gap-3">
        <Button
          onClick={() => setShowConstellation(true)}
          className="bg-black/60 backdrop-blur-md border border-[#9333EA]/30 hover:bg-[#9333EA]/20 text-white"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Life Constellation
        </Button>
        <Button
          onClick={() => setShowSynergyStream(true)}
          className="bg-black/60 backdrop-blur-md border border-[#FF6B00]/30 hover:bg-[#FF6B00]/20 text-white"
        >
          <Network className="w-4 h-4 mr-2" />
          Synergy Stream
        </Button>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-8 left-8 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-black/60 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-sm text-gray-300"
        >
          <p className="mb-1">🖱️ Drag to rotate</p>
          <p className="mb-1">🔍 Scroll to zoom</p>
          <p className="mb-1">✨ Click satellites to explore</p>
          <p>🎤 Use voice commands to navigate</p>
        </motion.div>
      </div>

      {/* Holographic Display */}
      <AnimatePresence>
        {selectedGuild && <HolographicDisplay guildType={selectedGuild} onClose={() => setSelectedGuild(null)} />}
      </AnimatePresence>

      {/* Life Constellation */}
      <AnimatePresence>
        {showConstellation && <LifeConstellation onClose={() => setShowConstellation(false)} />}
      </AnimatePresence>

      {/* Synergy Stream */}
      <AnimatePresence>
        {showSynergyStream && (
          <SynergyStream
            from="wellness"
            to="financial"
            insight="I've detected a new synergy: your morning workouts are directly correlated with a positive 2% daily gain in your portfolio, likely due to increased clarity in decision-making."
            onClose={() => setShowSynergyStream(false)}
          />
        )}
      </AnimatePresence>

      {/* Voice-First Talking Orb */}
      <TalkingOrb />
    </div>
  )
}
