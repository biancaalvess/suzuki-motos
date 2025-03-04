"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajusta as dimensões do canvas
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Classe Particle
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocidade constante
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;

        const colors = ["#3A5311", "#4A6522", "#2F4F2F", "#8BAF56"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Criando partículas
    const particleCount = canvas ? Math.floor((canvas.width * canvas.height) / 8000) : 100;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      if (canvas) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    }

    function drawConnections() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 175, 86, ${(1 - distance / 120) * 0.2})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}
