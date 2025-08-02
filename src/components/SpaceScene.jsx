import React from 'react'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { selectIsDark } from '../app/themeSlice'
import * as THREE from 'three'

// Planet component with customizable properties
const Planet = ({ position, size, color, rotationSpeed = 0.01, emissive = '#000000', roughness = 0.7, metalness = 0.2 }) => {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={emissive}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  )
}

// Orbit path visualization
const OrbitPath = ({ radius, color = '#333333', opacity = 0.3 }) => {
  const points = []
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }
  points.push(points[0]) // Close the loop

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  )
}

// Asteroid belt
const AsteroidBelt = ({ count = 200, innerRadius = 5, outerRadius = 7, color = '#777777' }) => {
  const asteroids = []
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = (Math.random() - 0.5) * 0.5 // Slight vertical variation
    const size = 0.05 + Math.random() * 0.1
    
    asteroids.push(
      <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]}>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    )
  }
  
  return <group>{asteroids}</group>
}

// Main scene component
const Scene = () => {
  const isDark = useSelector(selectIsDark)
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 15, 25)
  }, [])

  return (
    <>
      <ambientLight intensity={isDark ? 0.1 : 0.3} />
      <pointLight position={[0, 0, 0]} intensity={isDark ? 1.5 : 2} color={isDark ? '#f8f0e3' : '#ffffff'} />
      
      {/* Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color={isDark ? '#ff9500' : '#ffcc00'} 
          emissive={isDark ? '#ff6000' : '#ffcc00'}
          emissiveIntensity={1.5}
        />
      </mesh>
      
      {/* Planets */}
      <OrbitPath radius={4} />
      <Planet position={[4, 0, 0]} size={0.5} color="#3498db" rotationSpeed={0.02} />
      
      <OrbitPath radius={7} />
      <Planet position={[7, 0, 0]} size={0.7} color="#e74c3c" rotationSpeed={0.015} />
      
      <OrbitPath radius={10} />
      <Planet position={[10, 0, 0]} size={0.8} color="#2ecc71" rotationSpeed={0.01} />
      
      <OrbitPath radius={14} />
      <Planet position={[14, 0, 0]} size={1.2} color="#f39c12" rotationSpeed={0.008} />
      
      {/* Asteroid Belt */}
      <AsteroidBelt innerRadius={17} outerRadius={19} />
      
      <OrbitPath radius={22} />
      <Planet position={[22, 0, 0]} size={1.0} color="#9b59b6" rotationSpeed={0.005} />
      
      <Stars radius={100} depth={50} count={isDark ? 5000 : 3000} factor={4} saturation={isDark ? 1 : 0.5} fade speed={1} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

const SpaceScene = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 15, 25], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default SpaceScene