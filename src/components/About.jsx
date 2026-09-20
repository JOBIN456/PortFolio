import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

function Ai3DNeuralSphere() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create 3D spherical points (Fibonacci sphere distribution for perfect distribution)
    const numPoints = 65;
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x,
        y,
        z,
        baseRadius: 1.8 + Math.random() * 1.5,
      });
    }

    let rotX = 0.4;
    let rotY = 0.6;
    let rotZ = 0.2;
    let time = 0;

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current = { x: nx * 3, y: ny * 3, isHovered: true };
    };

    const onMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const nx = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const ny = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      mouseRef.current = { x: nx * 3, y: ny * 3, isHovered: true };
    };

    const onTouchEnd = () => {
      mouseRef.current.isHovered = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    const render = () => {
      time += 0.025;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const sphereRadius = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h / 2;

      // Smooth rotation with mouse influence
      if (mouseRef.current.isHovered) {
        rotY += 0.015 + mouseRef.current.x * 0.01;
        rotX += 0.01 + mouseRef.current.y * 0.01;
      } else {
        rotY += 0.012;
        rotX += 0.007;
        rotZ += 0.004;
      }

      // Rotate points in 3D
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const projected = points.map((p) => {
        // Rotate around Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y;

        // Rotate around X
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = z1 * cosX + y1 * sinX;
        let x2 = x1;

        // Rotate around Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = y2 * cosZ + x2 * sinZ;
        let z3 = z2;

        // Perspective projection
        const fov = 350;
        const scale = fov / (fov + z3 * sphereRadius);
        const px = cx + x3 * sphereRadius * scale;
        const py = cy + y3 * sphereRadius * scale;
        const alpha = Math.max(0.15, Math.min(1, (z3 + 1.2) / 2.2));

        return { px, py, z: z3, scale, alpha, baseR: p.baseRadius };
      });

      // Sort by depth (back to front)
      projected.sort((a, b) => a.z - b.z);

      // Draw connections
      const maxConnDist = sphereRadius * 0.62;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDist) {
            const connAlpha = (1 - dist / maxConnDist) * 0.3 * ((p1.alpha + p2.alpha) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(0, 255, 180, ${connAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw pulsing center glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, sphereRadius * 0.6);
      glowGrad.addColorStop(0, 'rgba(23, 202, 128, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(0, 210, 255, 0.15)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereRadius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw nodes
      for (const p of projected) {
        const r = p.baseR * p.scale * (1 + Math.sin(time * 3 + p.z) * 0.25);
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1, r), 0, Math.PI * 2);

        if (p.z > 0.3) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ffd5';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(78, 240, 173, ${p.alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="ai-3d-canvas" />;
}

export default function About() {
  const { personal, skills } = portfolioData;

  return (
    <section className="about-us" id="about">
      <div className="thegridabout">
        <div className="imagegrid ai-sphere-card" aria-label="Interactive 3D Neural Sphere">
          <Ai3DNeuralSphere />
        </div>

        <div className="contentgrid">
          <h3>Full Stack AI Engineering & Systems Profile</h3>
          <p className="about-text">{personal.aboutText}</p>

          <div className="skills-grid">
            {skills.map((skillGroup) => (
              <div className="skill-category" key={skillGroup.category}>
                <h4>{skillGroup.category}</h4>
                <div className="skill-tags">
                  {skillGroup.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


