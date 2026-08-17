const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

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
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = (uMouse - 0.5) * 0.16;
    float t = uTime * 0.028;
    float scroll = uScroll;

    vec2 p = uv * vec2(0.72, 0.58);
    p += mouse * 0.45;
    p += vec2(sin(t * 0.42), cos(t * 0.31)) * 0.12;
    p += vec2(scroll * 0.08, -scroll * 0.14);

    float n = fbm(p + t * 0.18);
    float n2 = fbm(p * 1.28 - t * 0.12 + n * 0.35);

    vec3 bg = vec3(0.058, 0.057, 0.055);
    vec3 warm = vec3(0.145, 0.062, 0.038);
    vec3 ember = vec3(1.0, 0.361, 0.208);
    vec3 amber = vec3(0.48, 0.2, 0.07);

    vec2 lightA = vec2(0.76, 0.14)
      + mouse * 0.22
      + vec2(sin(t * 0.33) * 0.09, cos(t * 0.26) * 0.07)
      + vec2(scroll * 0.05, -scroll * 0.1);

    vec2 lightB = vec2(0.16, 0.82)
      + mouse * 0.1
      + vec2(cos(t * 0.21) * 0.08, sin(t * 0.24) * 0.06)
      - vec2(scroll * 0.04, 0.0);

    float glowA = exp(-length((uv - lightA) * vec2(1.05, 0.92)) * 2.15);
    float glowB = exp(-length((uv - lightB) * vec2(1.15, 0.88)) * 1.85);

    float field = smoothstep(0.22, 0.88, n * 0.58 + n2 * 0.42);
    float wash = smoothstep(0.38, 1.0, n2);

    vec3 color = mix(bg, warm, field * 0.52 * uIntensity);
    color = mix(color, amber * 0.55, wash * 0.16 * uIntensity);
    color += ember * glowA * 0.17 * uIntensity;
    color += amber * glowB * 0.12 * uIntensity;

    float vignette = smoothstep(1.18, 0.28, length((uv - 0.5) * vec2(1.05, 1.0)));
    color *= mix(0.9, 1.0, vignette);

    float grain = (hash(uv * 72.0) - 0.5) * 0.012 * uQuality;
    color += grain * 0.35;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function intensityForScroll() {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  const y = window.scrollY + window.innerHeight * 0.32;
  let name = 'hero';
  for (const section of sections) {
    if (section.offsetTop <= y) name = section.dataset.section || name;
  }
  const map: Record<string, number> = {
    hero: 1,
    about: 0.42,
    experience: 0.14,
    work: 0.08,
    contact: 0.62,
  };
  return map[name] ?? 0.22;
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
      uQuality: { value: isMobile ? 0.4 : 1 },
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
      const dpr = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.25);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });

    let last = 0;
    const interval = isMobile ? 1000 / 24 : 1000 / 60;
    const start = performance.now();
    const root = document.documentElement;

    const tick = (now: number) => {
      if (disposed || !renderer) return;
      raf = requestAnimationFrame(tick);
      if (now - last < interval) return;
      last = now;

      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;
      intensity += (intensityForScroll() - intensity) * 0.035;

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scroll = Math.min(window.scrollY / maxScroll, 1);

      uniforms.uTime.value = (now - start) / 1000;
      uniforms.uMouse.value.set(pointer.x, pointer.y);
      uniforms.uScroll.value = scroll;
      uniforms.uIntensity.value = intensity;
      root.style.setProperty('--bg-shift', scroll.toFixed(3));

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
