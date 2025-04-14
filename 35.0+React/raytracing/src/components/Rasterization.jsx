import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Raster = () => {
  const canvasRef = useRef(null);
  const [lightAngle, setLightAngle] = useState(45);

  const handleSliderChange = (e) => setLightAngle(Number(e.target.value));

  useEffect(() => {
    const canvas = canvasRef.current;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow maps
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

    // Create spheres
    const redSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    redSphere.position.set(0, 0, -7);
    redSphere.castShadow = true; // Enable casting shadow
    redSphere.receiveShadow = true; // Enable receiving shadow
    scene.add(redSphere);

    const greenSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    greenSphere.position.set(-2, 2, -6);
    greenSphere.castShadow = true;
    greenSphere.receiveShadow = true;
    scene.add(greenSphere);

    const blueSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2),
      new THREE.MeshStandardMaterial({ color: 0x0000ff })
    );
    blueSphere.position.set(4, -2, -8);
    blueSphere.castShadow = true;
    blueSphere.receiveShadow = true;
    scene.add(blueSphere);

    // Create yellow triangle using BufferGeometry
    const triangleGeometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      -3, -3, -5,  // p1
      -1, -3, -5,  // p2
      -2, -1, -5   // p3
    ]);

    // Set the vertices for the triangle geometry
    triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Create material for the triangle
    const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

    // Create the triangle mesh
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
    triangle.castShadow = true;
    triangle.receiveShadow = true;
    scene.add(triangle);

    // Set the camera position
    camera.position.z = 10;

    // Create light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10); // Set light position initially
    light.castShadow = true; // Enable shadow casting for the light
    scene.add(light);

    // Set the light's target to the origin (red sphere)
    light.target.position.set(0, 0, -7);
    scene.add(light.target);

    // Orbit speed and angle for spheres
    const orbitSpeed = 0.05;
    const radius = 5;

    let frame = 0;
    const animate = () => {
      frame += 1;
      const angle = frame * orbitSpeed;

      // Update the positions of the green and blue spheres
      greenSphere.position.x = redSphere.position.x + radius * Math.cos(angle);
      greenSphere.position.z = redSphere.position.z + radius * Math.sin(angle);

      blueSphere.position.x = redSphere.position.x + radius * Math.cos(angle + Math.PI / 3);
      blueSphere.position.z = redSphere.position.z + radius * Math.sin(angle + Math.PI / 3);

      // Update light direction based on the slider angle
      const radians = (lightAngle * Math.PI) / 180;
      light.position.set(
        Math.sin(radians) * 10, // x position based on lightAngle
        10,                     // fixed height for the light source
        Math.cos(radians) * 10  // z position based on lightAngle
      );

      // Update the light's target to point to the origin (red sphere)
      light.target.position.set(0, 0, -7);

      // Render the scene
      renderer.render(scene, camera);

      // Call the animate function again on the next frame
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup the Three.js renderer and scene
      renderer.dispose();
      scene.clear();
    };
  }, [lightAngle]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "80vh" }} />
      <input
        type="range"
        min="0"
        max="360"
        value={lightAngle}
        onChange={handleSliderChange}
        style={{ width: "80%", marginTop: "1rem" }}
      />
      <p style={{ textAlign: "center" }}>💡 Light Angle: {lightAngle}°</p>
    </div>
  );
};

export default Raster;
