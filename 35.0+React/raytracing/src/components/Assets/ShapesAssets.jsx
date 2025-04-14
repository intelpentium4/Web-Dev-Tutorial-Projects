import React from "react";

const add = (a, b) => a.map((val, i) => val + b[i]);
const scale = (v, s) => v.map((val) => val * s);
const subtract = (a, b) => a.map((v, i) => v - b[i]);

const normalize = (v) => {
  const mag = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
  return v.map((val) => val / mag);
};

const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

const dot = (a, b) => a.reduce((sum, val, i) => sum + val * b[i], 0);

const multiplyMatrixVector = (m, v) =>
  m.map((row) => row.reduce((sum, val, i) => sum + val * v[i], 0));

const sphereIntersect = (center, radius, rayOrigin, rayDir) => {
  const oc = subtract(rayOrigin, center);
  const b = 2 * dot(rayDir, oc);
  const c = dot(oc, oc) - radius * radius;
  const delta = b * b - 4 * c;
  if (delta > 0) {
    const t1 = (-b + Math.sqrt(delta)) / 2;
    const t2 = (-b - Math.sqrt(delta)) / 2;
    if (t1 > 0 && t2 > 0) return Math.min(t1, t2);
  }
  return null;
};

const triangleIntersect = (p1, p2, p3, rayOrigin, rayDir) => {
  const EPSILON = 1e-6;
  const edge1 = subtract(p2, p1);
  const edge2 = subtract(p3, p1);
  const h = cross(rayDir, edge2);
  const a = dot(edge1, h);
  if (Math.abs(a) < EPSILON) return null;
  const f = 1 / a;
  const s = subtract(rayOrigin, p1);
  const u = f * dot(s, h);
  if (u < 0 || u > 1) return null;
  const q = cross(s, edge1);
  const v = f * dot(rayDir, q);
  if (v < 0 || u + v > 1) return null;
  const t = f * dot(edge2, q);
  return t > EPSILON ? t : null;
};

export { add, subtract, scale, normalize, cross, dot, multiplyMatrixVector, sphereIntersect, triangleIntersect };