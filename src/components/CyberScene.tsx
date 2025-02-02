"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

interface CyberSceneProps {
  journeyStarted: boolean
  onJourneyComplete: () => void
}

const toolData = [
  {
    name: "METASPLOIT",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/msf-lejCLjWplp9DrfCLzieZPgm6bvNnn6.png",
  },
  {
    name: "KALI LINUX",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/klinux-YCFSaP92HnfPPwGa8n4RSv24B8hSVW.png",
  },
  {
    name: "HASHCAT",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hashcat-5be2UKTSqHZq04K8iCc4G11E6IgyWc.png",
  },
  {
    name: "WIRESHARK",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wiresharl-ih7gxiorxMZqo28YobBCJIvzXdKWaV.png",
  },
  {
    name: "NMAP",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nmap-lxK0aD1oPboWNp3uKKSrenZ8TcBvtV.png",
  },
  {
    name: "BURP SUITE",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/burp-maX3iQPWS8PMaNJeS3YumpBipJZF7L.png",
  },
]

export default function CyberScene({ journeyStarted, onJourneyComplete }: CyberSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const sceneObjects = useRef<{
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera
    renderer?: THREE.WebGLRenderer
    starField?: THREE.Points
    entrySphere?: THREE.Mesh
    tools: THREE.Mesh[]
  }>({ tools: [] })

  useEffect(() => {
    if (!sceneRef.current) return

    const { scene, camera, renderer } = initScene()
    const starField = createStarField()
    const entrySphere = createEntrySphere()

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100)
    pointLight.position.set(10, 10, 10)

    scene.add(ambientLight)
    scene.add(pointLight)
    scene.add(starField)
    scene.add(entrySphere)

    loadToolImages(scene)

    sceneObjects.current = { scene, camera, renderer, starField, entrySphere, tools: [] }

    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (journeyStarted) {
      startJourney()
    }
  }, [journeyStarted])

  function initScene() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    sceneRef.current?.appendChild(renderer.domElement)

    camera.position.z = 50
    return { scene, camera, renderer }
  }

  function createStarField() {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    for (let i = 0; i < 10000; i++) {
      vertices.push(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000)
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
    })
    return new THREE.Points(geometry, material)
  }

  function createEntrySphere() {
    const geometry = new THREE.SphereGeometry(5, 64, 64)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.7,
      emissive: 0x00ffff,
      emissiveIntensity: 0.3,
      shininess: 100,
    })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(0, 0, -20)
    return sphere
  }

  function loadToolImages(scene: THREE.Scene) {
    const loader = new THREE.TextureLoader()
    toolData.forEach((tool, index) => {
      loader.load(tool.image, (texture) => {
        texture.anisotropy = 16
        const material = new THREE.MeshPhongMaterial({
          map: texture,
          transparent: true,
          emissive: 0x00ffff,
          emissiveIntensity: 0.2,
          side: THREE.DoubleSide,
        })
        const geometry = new THREE.PlaneGeometry(12, 12)
        const mesh = new THREE.Mesh(geometry, material)

        const angle = (index / toolData.length) * Math.PI * 2
        const radius = 35
        mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, -50 - index * 20)

        mesh.rotation.y = angle
        scene.add(mesh)
        sceneObjects.current.tools.push(mesh)
      })
    })

    // Enhanced RVU Logo
    loader.load(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-qRhVobWjo6H1SFt0hA0T3EOPUOZBuL.png",
      (texture) => {
        texture.anisotropy = 16
        const material = new THREE.MeshPhongMaterial({
          map: texture,
          transparent: true,
          emissive: 0x00ffff,
          emissiveIntensity: 0.3,
          side: THREE.DoubleSide,
        })
        const geometry = new THREE.PlaneGeometry(25, 25)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, -250)
        scene.add(mesh)
      },
    )
  }

  function animate() {
    requestAnimationFrame(animate)
    const { scene, camera, renderer, starField, entrySphere, tools } = sceneObjects.current
    if (!scene || !camera || !renderer) return

    if (starField) {
      starField.rotation.y += 0.0001
      starField.rotation.x += 0.0001
    }

    if (entrySphere) {
      entrySphere.rotation.y += 0.005
      entrySphere.rotation.x += 0.002
    }

    tools.forEach((tool, index) => {
      tool.rotation.y += 0.01
      tool.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02
    })

    renderer.render(scene, camera)
  }

  function startJourney() {
    const { camera, entrySphere, tools } = sceneObjects.current
    if (!camera || !entrySphere) return

    gsap.to(camera.position, {
      z: -300,
      duration: 15,
      ease: "power2.inOut",
      onUpdate: () => {
        if (entrySphere && entrySphere.material instanceof THREE.MeshPhongMaterial) {
          entrySphere.material.opacity = Math.max(0, (camera.position.z + 100) / 80)
        }
        tools.forEach((tool, index) => {
          if (camera.position.z < tool.position.z && camera.position.z > tool.position.z - 20) {
            const progress = (camera.position.z - tool.position.z) / -20
            gsap.to(tool.position, {
              x: (index % 2 === 0 ? 1 : -1) * 20 * Math.sin(progress * Math.PI),
              duration: 0.5,
            })
          }
        })
      },
      onComplete: onJourneyComplete,
    })
  }

  return <div ref={sceneRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }} />
}

