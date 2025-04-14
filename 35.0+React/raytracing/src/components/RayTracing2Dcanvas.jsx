import React, { useEffect, useRef, useState } from "react";
import { add, subtract, scale, normalize, cross, dot, multiplyMatrixVector, sphereIntersect, triangleIntersect } from "./Assets/ShapesAssets";
import { lightDir, lightColor } from "./Assets/lightAssets";

const RayTracer = () => {
  const canvasRef = useRef(null);

  const [lightAngle, setLightAngle] = useState(45); // degrees
  const handleSliderChange = (e) => setLightAngle(Number(e.target.value));

  let hit = null;
  let normal = null;
  let hitColor = [0, 0, 0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    let frame = 0;
    let animationId;
  
    const imageWidth = 800;
    const imageHeight = 600;
    const imageAspectRatio = imageWidth / imageHeight;
    const fov = 80;
    const fovRad = (fov * Math.PI) / 180;
  
    const spheres = [
      { center: [0, 0, -7], radius: 1.5, color: [255, 0, 0] },
      { center: [-2, 2, -6], radius: 1, color: [0, 255, 0] },
      { center: [4, -2, -8], radius: 1.2, color: [0, 0, 255] },
    ];
  
    const triangle = {
      p1: [-3, -3, -5],
      p2: [-1, -3, -5],
      p3: [-2, -1, -5],
      color: [255, 255, 0],
    };

    const orbitSpeed = 0.1;  // Speed of the orbit (you can adjust this)
    const render = () => {
      frame += 1;
      const angle = frame * orbitSpeed;
  
      // camera at the center of the cluster
      const cameraPosition = [0, 3, 10];  // Fixed camera position (you can adjust this)
      const target = [0, 0, -7]; 
      let radius = 12;
      const height = 1;

      // Looking at the fixed target
      const From = cameraPosition;
      const To = [...target, 1];
      
      let Forward = normalize(subtract(From, To));
      const tmpUp = [0, 1, 0, 0];
      const Right = [...cross(tmpUp.slice(0, 3), Forward.slice(0, 3)), 0];
      const Up = [...cross(Forward.slice(0, 3), Right.slice(0, 3)), 0];
  
      const cameraToWorld = [
        [Right[0], Right[1], Right[2], 0],
        [Up[0], Up[1], Up[2], 0],
        [Forward[0], Forward[1], Forward[2], 0],
        [From[0], From[1], From[2], 1],
      ];

      radius = 5; // Orbit radius around the red sphere
      // Update the positions of the green, blue, and yellow spheres
      spheres[1].center = [
        target[0] + radius * Math.cos(angle), // Green sphere
        target[1], // Y stays the same
        target[2] + radius * Math.sin(angle),
    ];
      
    spheres[2].center = [
        target[0] + radius * Math.cos(angle + Math.PI / 3), // Blue sphere
        target[1], 
        target[2] + radius * Math.sin(angle + Math.PI / 3),
    ];
  
      // Get light direction from slider
      const radians = (lightAngle * Math.PI) / 180;
      const lightDir = normalize([Math.sin(radians), -1, Math.cos(radians)]);
  
      const imageData = ctx.createImageData(imageWidth, imageHeight);
      const pixels = imageData.data;
  
      for (let x = 0; x < imageWidth; x++) {
        for (let y = 0; y < imageHeight; y++) {
          const Px =
            (2 * ((x + 0.5) / imageWidth) - 1) *
            Math.tan(fovRad / 2) *
            imageAspectRatio;
          const Py = (1 - 2 * ((y + 0.5) / imageHeight)) * Math.tan(fovRad / 2);
          const direction = [Px, Py, -1, 0];
          const worldDir = multiplyMatrixVector(cameraToWorld, direction);
          let rayDir = normalize(worldDir.slice(0, 3));
  
          let color = [0, 0, 0];
          let closestT = Infinity;
          let hit = null;
          let normal = null;
          let hitColor = [0, 0, 0];
  
          const tTri = triangleIntersect(
            triangle.p1,
            triangle.p2,
            triangle.p3,
            From.slice(0, 3),
            rayDir
          );
          if (tTri !== null && tTri < closestT) {
            closestT = tTri;
            hit = add(From.slice(0, 3), scale(rayDir, tTri));
            const edge1 = subtract(triangle.p2, triangle.p1);
            const edge2 = subtract(triangle.p3, triangle.p1);
            normal = normalize(cross(edge1, edge2));
            hitColor = triangle.color;
          }
  
          for (const sphere of spheres) {
            const t = sphereIntersect(
              sphere.center,
              sphere.radius,
              From.slice(0, 3),
              rayDir
            );
            if (t !== null && t < closestT) {
              closestT = t;
              hit = add(From.slice(0, 3), scale(rayDir, t));
              normal = normalize(subtract(hit, sphere.center));
              hitColor = sphere.color;
            }
          }
  
          if (hit) {
            const shadowRayOrigin = add(hit, scale(normal, 0.001));
            const shadowRayDir = scale(lightDir, -1);
            let inShadow = false;
  
            for (const s of spheres) {
              const shadowHit = sphereIntersect(
                s.center,
                s.radius,
                shadowRayOrigin,
                shadowRayDir
              );
              if (shadowHit !== null) {
                inShadow = true;
                break;
              }
            }
  
            const brightness = inShadow
              ? 0.1
              : Math.max(0, dot(normal, scale(lightDir, -1)));
            color = hitColor.map((c) => c * brightness);
          }
  
          const index = (y * imageWidth + x) * 4;
          pixels[index] = color[0];
          pixels[index + 1] = color[1];
          pixels[index + 2] = color[2];
          pixels[index + 3] = 255;
        }
      }
  
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(render);
    };
  
    render();
  
    return () => cancelAnimationFrame(animationId);
  }, [lightAngle]);

  return (
    <div>
        <canvas ref={canvasRef} width={800} height={600} />
        <input
            type="range"
            min="0"
            max="360"
            value={lightAngle}
            onChange={handleSliderChange}
            style={{ width: "100%", marginTop: "1rem" }}
        />
        <p style={{ textAlign: "center" }}>💡 Light Angle: {lightAngle}°</p>
    </div>
  );
};

export default RayTracer;
