import React, { useState } from 'react';

// Vector3D class to handle 3D vector operations
class Vector3D {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // Vector subtraction
  subtract(other) {
    return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  // Vector addition
  add(other) {
    return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  // Scalar multiplication
  multiply(scalar) {
    return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  // Dot product
  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  // Cross product
  cross(other) {
    return new Vector3D(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
}

// Möller–Trumbore intersection algorithm
const epsilon = 1e-6;

const rayIntersectsTriangle = (rayOrigin, rayDir, v0, v1, v2) => {
  // Calculate triangle edges
  const E1 = v1.subtract(v0);
  const E2 = v2.subtract(v0);

  // Compute the cross product of ray direction and edge E2
  const P = rayDir.cross(E2);

  // Compute the determinant
  const det = E1.dot(P);

  // If the determinant is close to zero, the ray is parallel to the plane
  if (Math.abs(det) < epsilon) {
    return [false, null];
  }

  // Calculate the vector from the ray origin to the first vertex
  const T = rayOrigin.subtract(v0);

  // Calculate the u and v barycentric coordinates
  const u = T.dot(P) / det;
  if (u < 0 || u > 1) {
    return [false, null];
  }

  const Q = T.cross(E1);
  const v = rayDir.dot(Q) / det;
  if (v < 0 || u + v > 1) {
    return [false, null];
  }

  // Calculate t, the distance from the ray origin to the intersection point
  const t = E2.dot(Q) / det;
  if (t > epsilon) {
    const intersectionPoint = rayOrigin.add(rayDir.multiply(t));
    return [true, intersectionPoint];
  }

  return [false, null];
};

const RayIntersectionApp = () => {
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  // Test Case 1: Intersection
  const rayOrigin1 = new Vector3D(0, 0, 0);
  const rayDir1 = new Vector3D(0, 0, 1);
  const v0_1 = new Vector3D(0, 1, 5);
  const v1_1 = new Vector3D(1, -1, 5);
  const v2_1 = new Vector3D(-1, -1, 5);

  // Test Case 2: No Intersection
  const rayOrigin2 = new Vector3D(0, 0, 0);
  const rayDir2 = new Vector3D(1, 0, 0);
  const v0_2 = new Vector3D(0, 1, 5);
  const v1_2 = new Vector3D(1, -1, 5);
  const v2_2 = new Vector3D(-1, -1, 5);

  // Run both test cases
  const testIntersection = () => {
    // Test Case 1
    const [hit1, intersectionPoint1] = rayIntersectsTriangle(rayOrigin1, rayDir1, v0_1, v1_1, v2_1);
    setResult1(hit1 ? `Intersection at (${intersectionPoint1.x.toFixed(2)}, ${intersectionPoint1.y.toFixed(2)}, ${intersectionPoint1.z.toFixed(2)})` : 'No intersection');

    // Test Case 2
    const [hit2, intersectionPoint2] = rayIntersectsTriangle(rayOrigin2, rayDir2, v0_2, v1_2, v2_2);
    setResult2(hit2 ? `Intersection at (${intersectionPoint2.x.toFixed(2)}, ${intersectionPoint2.y.toFixed(2)}, ${intersectionPoint2.z.toFixed(2)})` : 'No intersection');
  };

  return (
    <div>
      <h1>Ray-Triangle Intersection Test</h1>
      <button onClick={testIntersection}>Run Intersection Tests</button>
      <div>
        <h2>Test Case 1: Intersection Test</h2>
        <p>{result1 ? result1 : 'Waiting for result...'}</p>
      </div>
      <div>
        <h2>Test Case 2: No Intersection Test</h2>
        <p>{result2 ? result2 : 'Waiting for result...'}</p>
      </div>
    </div>
  );
};

export default RayIntersectionApp;
