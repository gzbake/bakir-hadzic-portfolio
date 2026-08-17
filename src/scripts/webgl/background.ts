const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uQuality;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = (uMouse - 0.5) * 0.22;
    float t = uTime * 0.055;

    vec2 p = uv * vec2(1.35, 1.0);
    p += mouse;
    p += vec2(sin(t * 0.55), cos(t * 0.4)) * 0.16;

    float n = fbm(p + t * 0.28);
    float n2 = fbm(p * 1.65 - t * 0.2 + n);

    vec3 bg = vec3(0.067);
    vec3 warm = vec3(0.22, 0.09, 0.055);
    vec3 ember = vec3(1.0, 0.361, 0.208);

    vec2 lightPos = vec2(0.72, 0.18) + mouse * 0.35 + vec2(sin(t * 0.35) * 0.08, cos(t * 0.28) * 0.06);
    float light = exp(-length(uv - lightPos) * 3.2);

    float field = smoothstep(0.18, 0.9, n * 0.6 + n2 * 0.5);
    float glow = smoothstep(0.42, 1.0, n2) * uIntensity;

    vec3 color = mix(bg, warm, field * 0.95 * uIntensity);
    color = mix(color, ember * 0.38, glow * 0.7);
    color += ember * light * 0.22 * uIntensity;

    float vignette = smoothstep(1.2, 0.22, length(uv - 0.5));
    color *= mix(0.78, 1.0, vignette);

    float grain = (hash(uv * 260.0 + fract(uTime) * 50.0) - 0.5) * 0.04 * uQuality;
    color += grain * uIntensity;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function intensityForScroll() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  const y = window.scrollY + window.innerHeight * 0.28;
  let name = 'hero';
  for (const section of sections) {
    if (section.offsetTop <= y) name = section.dataset.section || name;
  }
  const map: Record<string, number> = {
    hero: 1,
    about: 0.32,
    experience: 0.08,
    work: 0.05,
    contact: 0.52,
  };
  return map[name] ?? 0.2;
}

export function createBackground() {
  const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;
  const fallback = document.getElementById('bg-fallback');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canvas) return () => {};

  if (reduced) {
    canvas.remove();
    fallback?.removeAttribute('hidden');
    return () => {};
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches || navigator.maxTouchPoints > 0;

  let renderer: import('three').WebGLRenderer | null = null;
  let raf = 0;
  let disposed = false;
  let intensity = 1;

  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const onPointer = (e: PointerEvent) => {
    if (isMobile) return;
    pointer.tx = e.clientX / window.innerWidth;
    pointer.ty = 1 - e.clientY / window.innerHeight;
  };

  const boot = async () => {
    const THREE = await import('three');
    if (disposed) return;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      canvas.remove();
      fallback?.removeAttribute('hidden');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uQuality: { value: isMobile ? 0.45 : 1 },
      uIntensity: { value: 1 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      if (!renderer) return;
      const dpr = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });

    let last = 0;
    const interval = isMobile ? 1000 / 30 : 1000 / 60;
    const start = performance.now();

    const tick = (now: number) => {
      if (disposed || !renderer) return;
      raf = requestAnimationFrame(tick);
      if (now - last < interval) return;
      last = now;

      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      intensity += (intensityForScroll() - intensity) * 0.045;

      uniforms.uTime.value = (now - start) / 1000;
      uniforms.uMouse.value.set(pointer.x, pointer.y);
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      uniforms.uScroll.value = Math.min(window.scrollY / maxScroll, 1);
      uniforms.uIntensity.value = intensity;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(tick);

    const visibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', visibility);

    cleanupFns.push(() => {
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      cancelAnimationFrame(raf);
      material.dispose();
      mesh.geometry.dispose();
      renderer?.dispose();
    });
  };

  const cleanupFns: Array<() => void> = [];
  void boot();

  return () => {
    disposed = true;
    cleanupFns.forEach((fn) => fn());
  };
}
