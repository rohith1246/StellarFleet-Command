/**
 * OrbitalMechanicsRK4.js - Runge-Kutta 4th Order Gravitational Orbit Integrator
 */
class OrbitalMechanicsRK4 {
  constructor(gravitationalConstant = 6.67430e-11) {
    this.G = gravitationalConstant;
  }

  computeGravitationalAcceleration(pos, celestialBodies) {
    let ax = 0.0, ay = 0.0, az = 0.0;
    for (const body of celestialBodies) {
      const dx = body.pos.x - pos.x;
      const dy = body.pos.y - pos.y;
      const dz = body.pos.z - pos.z;
      const distSq = dx * dx + dy * dy + dz * dz + 1e-5;
      const dist = Math.sqrt(distSq);
      const force = (this.G * body.mass) / distSq;
      ax += force * (dx / dist);
      ay += force * (dy / dist);
      az += force * (dz / dist);
    }
    return { x: ax, y: ay, z: az };
  }

  integrateRK4(ship, celestialBodies, dt = 1.0) {
    const p0 = ship.pos;
    const v0 = ship.vel;

    // k1
    const a1 = this.computeGravitationalAcceleration(p0, celestialBodies);
    const k1_v = { x: v0.x, y: v0.y, z: v0.z };
    const k1_a = a1;

    // k2
    const p1 = { x: p0.x + k1_v.x * 0.5 * dt, y: p0.y + k1_v.y * 0.5 * dt, z: p0.z + k1_v.z * 0.5 * dt };
    const v1 = { x: v0.x + k1_a.x * 0.5 * dt, y: v0.y + k1_a.y * 0.5 * dt, z: v0.z + k1_a.z * 0.5 * dt };
    const a2 = this.computeGravitationalAcceleration(p1, celestialBodies);

    // k3
    const p2 = { x: p0.x + v1.x * 0.5 * dt, y: p0.y + v1.y * 0.5 * dt, z: p0.z + v1.z * 0.5 * dt };
    const v2 = { x: v0.x + a2.x * 0.5 * dt, y: v0.y + a2.y * 0.5 * dt, z: v0.z + a2.z * 0.5 * dt };
    const a3 = this.computeGravitationalAcceleration(p2, celestialBodies);

    // k4
    const p3 = { x: p0.x + v2.x * dt, y: p0.y + v2.y * dt, z: p0.z + v2.z * dt };
    const v3 = { x: v0.x + a3.x * dt, y: v0.y + a3.y * dt, z: v0.z + a3.z * dt };
    const a4 = this.computeGravitationalAcceleration(p3, celestialBodies);

    ship.pos.x += (dt / 6.0) * (k1_v.x + 2 * v1.x + 2 * v2.x + v3.x);
    ship.pos.y += (dt / 6.0) * (k1_v.y + 2 * v1.y + 2 * v2.y + v3.y);
    ship.pos.z += (dt / 6.0) * (k1_v.z + 2 * v1.z + 2 * v2.z + v3.z);

    ship.vel.x += (dt / 6.0) * (k1_a.x + 2 * a2.x + 2 * a3.x + a4.x);
    ship.vel.y += (dt / 6.0) * (k1_a.y + 2 * a2.y + 2 * a3.y + a4.y);
    ship.vel.z += (dt / 6.0) * (k1_a.z + 2 * a2.z + 2 * a3.z + a4.z);

    return ship;
  }
}

module.exports = { OrbitalMechanicsRK4 };
