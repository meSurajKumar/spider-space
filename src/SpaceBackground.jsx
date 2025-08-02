import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Planet component with customizable properties
const Planet = ({ name, position, size, color, orbitRadius, orbitSpeed, rotationSpeed, emissive = '#000000', roughness = 0.7, metalness = 0.2 }) => {
  const meshRef = useRef()
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += rotationSpeed
      
      // Orbit around the sun
      setAngle(prev => prev + orbitSpeed)
      const x = Math.cos(angle) * orbitRadius
      const z = Math.sin(angle) * orbitRadius
      meshRef.current.position.x = x
      meshRef.current.position.z = z
    }
  })

  return (
    <mesh ref={meshRef} position={position} name={name}>
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
  const groupRef = useRef()
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
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005
    }
  })
  
  return <group ref={groupRef}>{asteroids}</group>
}

// Main scene component
const Scene = ({ 
  isDark = false, 
  planetsConfig = null,
  showAsteroidBelt = true,
  systemRotationSpeed = 0.001,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableControls = true,
  starsCount = 5000
}) => {
  const sceneRef = useRef()
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 15, 25)
  }, [])

  useFrame(() => {
    if (sceneRef.current && systemRotationSpeed > 0) {
      sceneRef.current.rotation.y += systemRotationSpeed
    }
  })

  // Default planets if no custom config provided
  const defaultPlanets = [
    { name: "Mercury", size: 0.4, color: "#aaa9ad", orbitRadius: 4, orbitSpeed: 0.01, rotationSpeed: 0.004 },
    { name: "Venus", size: 0.6, color: "#e39e1c", orbitRadius: 6, orbitSpeed: 0.007, rotationSpeed: 0.002 },
    { name: "Earth", size: 0.6, color: "#2f6a69", orbitRadius: 8, orbitSpeed: 0.005, rotationSpeed: 0.02 },
    { name: "Mars", size: 0.5, color: "#c1440e", orbitRadius: 10, orbitSpeed: 0.004, rotationSpeed: 0.018 },
    { name: "Jupiter", size: 1.2, color: "#d8ca9d", orbitRadius: 14, orbitSpeed: 0.002, rotationSpeed: 0.04 },
    { name: "Saturn", size: 1.0, color: "#ead6b8", orbitRadius: 18, orbitSpeed: 0.0015, rotationSpeed: 0.038 },
    { name: "Uranus", size: 0.8, color: "#d1e7e7", orbitRadius: 22, orbitSpeed: 0.001, rotationSpeed: 0.03 },
    { name: "Neptune", size: 0.8, color: "#5b5ddf", orbitRadius: 26, orbitSpeed: 0.0008, rotationSpeed: 0.032 },
  ]

  const planets = planetsConfig || defaultPlanets

  return (
    <group ref={sceneRef}>
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
      {planets.map((planet, index) => (
        <React.Fragment key={planet.name || index}>
          <OrbitPath radius={planet.orbitRadius} />
          <Planet 
            name={planet.name || `planet-${index}`}
            position={[planet.orbitRadius, 0, 0]} 
            size={planet.size} 
            color={planet.color} 
            orbitRadius={planet.orbitRadius}
            orbitSpeed={planet.orbitSpeed}
            rotationSpeed={planet.rotationSpeed}
            emissive={planet.emissive || '#000000'}
            roughness={planet.roughness !== undefined ? planet.roughness : 0.7}
            metalness={planet.metalness !== undefined ? planet.metalness : 0.2}
          />
        </React.Fragment>
      ))}
      
      {/* Asteroid Belt */}
      {showAsteroidBelt && (
        <AsteroidBelt innerRadius={12} outerRadius={13} count={300} />
      )}
      
      <Stars radius={100} depth={50} count={isDark ? starsCount : Math.floor(starsCount * 0.6)} factor={4} saturation={isDark ? 1 : 0.5} fade speed={1} />
      
      {enableControls && (
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true} 
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      )}
    </group>
  )
}

// Main component
const SpaceBackground = ({ 
  className = "", 
  style = {}, 
  isDark = false,
  planetsConfig = null,
  showAsteroidBelt = true,
  systemRotationSpeed = 0.001,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  enableControls = true,
  starsCount = 5000,
  backgroundColor = "transparent",
  children
}) => {
  return (
    <div className="relative min-h-screen w-full">
      <div 
        className={`fixed inset-0 w-full h-full -z-10 ${className}`} 
        style={{ backgroundColor, ...style }}
      >
        <Canvas 
          dpr={[1, 2]} 
          camera={{ position: [0, 15, 25], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene 
            isDark={isDark}
            planetsConfig={planetsConfig}
            showAsteroidBelt={showAsteroidBelt}
            systemRotationSpeed={systemRotationSpeed}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            enableControls={enableControls}
            starsCount={starsCount}
          />
        </Canvas>
      </div>
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>
    </div>
  )
}

export default SpaceBackground