const SOLID_BG = 0x0c0c0c;
const RIPPLE_DAMPING = 0.987;
const RIPPLE_STR_BG = 1.0;
const RIPPLE_TOUCH_STR = 0.72;
const POINTER_SMOOTH = 0.07;
const POINTER_SMOOTH_TOUCH = 0.06;
const NOISE_URL = 'https://cms.softdb.com/uploads/whitenoise_e15a4419e2.gif';

const simVert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simFrag = /* glsl */ `
  precision mediump float;
  uniform sampler2D uBuffer;
  uniform vec2 uTexelSize;
  uniform vec2 uDropPos;
  uniform float uDropStrength, uHasDrop, uDamping;
  varying vec2 vUv;
  void main(){
    float c = texture2D(uBuffer, vUv).r;
    float p = texture2D(uBuffer, vUv).g;
    float n = texture2D(uBuffer, vUv + vec2(0.0, uTexelSize.y)).r;
    float s = texture2D(uBuffer, vUv - vec2(0.0, uTexelSize.y)).r;
    float e = texture2D(uBuffer, vUv + vec2(uTexelSize.x, 0.0)).r;
    float w = texture2D(uBuffer, vUv - vec2(uTexelSize.x, 0.0)).r;
    float nx = (2.0 * c - p + 0.5 * (n + s + e + w - 4.0 * c)) * uDamping;
    if (uHasDrop > 0.5)
      nx += smoothstep(0.05, 0.0, length(vUv - uDropPos)) * uDropStrength;
    gl_FragColor = vec4(clamp(nx, -1.0, 1.0), c, 0.0, 1.0);
  }
`;

function hashNoise() {
  return /* glsl */ `
    float hash(vec2 p){
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float vnoise(vec2 p){
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }
    vec3 overlay(vec3 b, vec3 f){
      return mix(2.0 * b * f, 1.0 - 2.0 * (1.0 - b) * (1.0 - f), step(0.5, b));
    }
  `;
}

function fbmFn(iters: number) {
  const lines = ['float v = 0.0; float a = 0.5; vec2 p = x; mat2 m = mat2(0.866, 0.5, -0.5, 0.866);'];
  for (let i = 0; i < iters; i++) {
    lines.push('v += a * vnoise(p); p = m * p * 2.02; a *= 0.5;');
  }
  lines.push('return v;');
  return `float fbm(vec2 x){\n${lines.join('\n')}\n}`;
}

function bgFrag(iters: number) {
  return /* glsl */ `
    precision mediump float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform vec2 uResolution;
    uniform sampler2D uNoise;
    uniform float uHasNoise;
    uniform sampler2D uRipple;
    uniform vec2 uRippleTexel;
    uniform float uRippleStr;
    uniform float uGrainMix;

    ${hashNoise()}
    ${fbmFn(iters)}

    void main(){
      float asp = uResolution.x / max(uResolution.y, 1.0);
      vec2 ptr = uPointer;

      float nH = texture2D(uRipple, vUv + vec2(0.0, uRippleTexel.y)).r;
      float sH = texture2D(uRipple, vUv - vec2(0.0, uRippleTexel.y)).r;
      float eH = texture2D(uRipple, vUv + vec2(uRippleTexel.x, 0.0)).r;
      float wH = texture2D(uRipple, vUv - vec2(uRippleTexel.x, 0.0)).r;
      vec2 rG = vec2(eH - wH, nH - sH);
      float rH = texture2D(uRipple, vUv).r;

      vec2 duv = vUv + rG * 0.009;
      vec2 cuv = (duv - 0.5) * vec2(asp, 1.0);
      vec3 col = vec3(0.047, 0.047, 0.047);

      vec2 gA = cuv - (vec2(0.0, 0.1) + ptr * 0.6);
      vec2 gB = cuv - (vec2(-0.25, -0.35) + ptr * 0.9);
      vec2 gC = cuv - (vec2(0.3, 0.35) + ptr * 1.1);
      col += vec3(0.102, 0.039, 0.022) * exp(-dot(gA, gA) * 2.6);
      col += vec3(0.039, 0.015, 0.010) * exp(-dot(gB, gB) * 1.8);
      col += vec3(0.056, 0.022, 0.014) * exp(-dot(gC, gC) * 2.1);

      col *= 1.0 - smoothstep(0.4, 1.4, length(cuv)) * 0.55;

      float cm = fbm(cuv * 1.55 + uTime * 0.035);
      col += vec3(0.084, 0.034, 0.020) * cm * 0.42;

      if (uHasNoise > 0.5 && uGrainMix > 0.0) {
        vec3 ns = texture2D(uNoise, gl_FragCoord.xy / 256.0).rgb;
        col = mix(col, overlay(col, ns), uGrainMix);
      }

      float sh = dot(rG, normalize(vec2(0.55, 0.80)));
      col += vec3(0.266, 0.098, 0.056) * max(0.0, sh) * 0.5 * uRippleStr;
      col *= 1.0 - max(0.0, -sh) * 0.22 * uRippleStr;
      col += vec3(0.07, 0.028, 0.015) * abs(rH) * 0.35 * uRippleStr;

      gl_FragColor = vec4(col, 1.0);
    }
  `;
}

const bgVert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function makeNoiseTexture(THREE: typeof import('three')): import('three').Texture {
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.floor(Math.random() * 255);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export function createBackground() {
  const wrap = document.getElementById('ripple-wrap');
  const canvas = (document.getElementById('ripple-canvas') || document.getElementById('bg-canvas')) as HTMLCanvasElement | null;
  const fallback = document.getElementById('bg-fallback');
  const atmosphere = document.querySelector('.bg-atmosphere') as HTMLElement | null;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canvas) return () => {};

  if (reduced) {
    canvas.remove();
    wrap?.remove();
    fallback?.removeAttribute('hidden');
    return () => {};
  }

  atmosphere?.setAttribute('hidden', '');
  fallback?.setAttribute('hidden', '');

  const MOBILE =
    window.matchMedia('(max-width: 700px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;
  const RIPPLE_RES = MOBILE ? 256 : 512;
  const FBM_ITERS = MOBILE ? 3 : 5;
  const MAX_DPR = MOBILE ? 1.5 : 2;
  const smooth = MOBILE ? POINTER_SMOOTH_TOUCH : POINTER_SMOOTH;

  let renderer: import('three').WebGLRenderer | null = null;
  let raf = 0;
  let disposed = false;
  let paused = false;
  let lastTime = performance.now();

  const pointerTarget = { x: 0, y: 0 };
  const pointerCurrent = { x: 0, y: 0 };
  const prevRipplePtr = { x: -9, y: -9 };
  let dropPending = false;
  let dropPosition = { x: 0.5, y: 0.5 };
  let dropStr = 0;

  const canvasPoint = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
    const y = -(((clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1);
    return { x, y };
  };

  const uvFromClient = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / Math.max(rect.width, 1),
      y: 1 - (clientY - rect.top) / Math.max(rect.height, 1),
    };
  };

  const onPointerLeave = () => {
    pointerTarget.x = 0;
    pointerTarget.y = 0;
  };

  let lastTouchDrop = 0;
  const injectTouchDrop = (clientX: number, clientY: number) => {
    const now = performance.now();
    if (now - lastTouchDrop < 50) return;
    lastTouchDrop = now;
    const uv = uvFromClient(clientX, clientY);
    dropPending = true;
    dropPosition = uv;
    dropStr = RIPPLE_TOUCH_STR * 0.72;
    const p = canvasPoint(clientX, clientY);
    pointerTarget.x = p.x;
    pointerTarget.y = p.y;
  };

  const onPointerMove = (e: PointerEvent) => {
    const p = canvasPoint(e.clientX, e.clientY);
    pointerTarget.x = p.x;
    pointerTarget.y = p.y;
    if (e.pointerType === 'touch' || (MOBILE && e.pointerType !== 'mouse')) {
      injectTouchDrop(e.clientX, e.clientY);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') return;
    injectTouchDrop(e.clientX, e.clientY);
  };

  const boot = async () => {
    const THREE = await import('three');
    if (disposed) return;

    THREE.ColorManagement.enabled = false;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      canvas.remove();
      fallback?.removeAttribute('hidden');
      return;
    }

    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setClearColor(SOLID_BG, 1);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simScene = new THREE.Scene();
    const bgScene = new THREE.Scene();

    const gl = renderer.getContext();
    const halfFloatOk =
      renderer.capabilities.isWebGL2 ||
      !!gl.getExtension('EXT_color_buffer_half_float') ||
      !!gl.getExtension('WEBGL_color_buffer_float');

    const rtOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: halfFloatOk ? THREE.HalfFloatType : THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(RIPPLE_RES, RIPPLE_RES, rtOpts);
    let rtB = new THREE.WebGLRenderTarget(RIPPLE_RES, RIPPLE_RES, rtOpts);

    const simUniforms = {
      uBuffer: { value: rtA.texture },
      uTexelSize: { value: new THREE.Vector2(1 / RIPPLE_RES, 1 / RIPPLE_RES) },
      uDropPos: { value: new THREE.Vector2(0.5, 0.5) },
      uDropStrength: { value: 0 },
      uHasDrop: { value: 0 },
      uDamping: { value: RIPPLE_DAMPING },
    };

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: simUniforms,
      vertexShader: simVert,
      fragmentShader: simFrag,
      depthTest: false,
      depthWrite: false,
    });

    const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
    simScene.add(simMesh);

    let noiseTex: import('three').Texture = makeNoiseTexture(THREE);
    const bgUniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uNoise: { value: noiseTex },
      uHasNoise: { value: 1 },
      uRipple: { value: rtA.texture },
      uRippleTexel: { value: new THREE.Vector2(1 / RIPPLE_RES, 1 / RIPPLE_RES) },
      uRippleStr: { value: MOBILE ? 0.72 : RIPPLE_STR_BG },
      uGrainMix: { value: MOBILE ? 0.22 : 0.45 },
    };

    const bgMaterial = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      vertexShader: bgVert,
      fragmentShader: bgFrag(FBM_ITERS),
      depthTest: false,
      depthWrite: false,
    });

    const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMaterial);
    bgMesh.position.z = -0.5;
    bgMesh.renderOrder = 0;
    bgScene.add(bgMesh);

    if (!MOBILE) {
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('anonymous');
      loader.load(
        NOISE_URL,
        (tex) => {
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.RepeatWrapping;
          tex.magFilter = THREE.LinearFilter;
          tex.minFilter = THREE.LinearFilter;
          noiseTex.dispose();
          noiseTex = tex;
          bgUniforms.uNoise.value = tex;
          bgUniforms.uHasNoise.value = 1;
        },
        undefined,
        () => {
          bgUniforms.uHasNoise.value = 1;
        },
      );
    }

    renderer.setRenderTarget(rtA);
    renderer.setClearColor(0x000000, 1);
    renderer.clear();
    renderer.setRenderTarget(rtB);
    renderer.clear();
    renderer.setRenderTarget(null);
    renderer.setClearColor(SOLID_BG, 1);

    const resize = () => {
      if (!renderer) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      bgMesh.scale.set(2.2, 2.2, 1);
      bgUniforms.uResolution.value.set(w * dpr, h * dpr);
    };

    resize();

    const tick = (now: number) => {
      if (disposed || !renderer) return;
      raf = requestAnimationFrame(tick);
      if (paused || document.hidden) return;
      if (MOBILE && now - lastTime < 1000 / 30) return;

      let dt = (now - lastTime) / 1000;
      lastTime = now;
      dt = Math.min(dt, 0.06);

      const t = 1 - Math.pow(1 - smooth, dt * 60);
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * t;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * t;

      if (prevRipplePtr.x < -8) {
        prevRipplePtr.x = pointerCurrent.x;
        prevRipplePtr.y = pointerCurrent.y;
      } else if (!MOBILE) {
        const vx = pointerCurrent.x - prevRipplePtr.x;
        const vy = pointerCurrent.y - prevRipplePtr.y;
        const speed = Math.hypot(vx, vy);
        if (speed > 0.0006) {
          dropPending = true;
          dropPosition = {
            x: pointerCurrent.x * 0.5 + 0.5,
            y: pointerCurrent.y * 0.5 + 0.5,
          };
          dropStr = Math.min(speed * 4.5, 0.52);
        }
      }
      prevRipplePtr.x = pointerCurrent.x;
      prevRipplePtr.y = pointerCurrent.y;

      simUniforms.uBuffer.value = rtA.texture;
      simUniforms.uHasDrop.value = dropPending ? 1 : 0;
      simUniforms.uDropPos.value.set(dropPosition.x, dropPosition.y);
      simUniforms.uDropStrength.value = dropStr;
      dropPending = false;

      renderer.setRenderTarget(rtB);
      renderer.render(simScene, simCamera);
      const tmp = rtA;
      rtA = rtB;
      rtB = tmp;

      bgUniforms.uRipple.value = rtA.texture;
      bgUniforms.uTime.value = now / 1000;
      bgUniforms.uPointer.value.set(pointerCurrent.x, pointerCurrent.y);

      renderer.setRenderTarget(null);
      renderer.render(bgScene, camera);
    };

    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) {
        lastTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    cleanupFns.push(() => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
      simMaterial.dispose();
      bgMaterial.dispose();
      simMesh.geometry.dispose();
      bgMesh.geometry.dispose();
      noiseTex.dispose();
      rtA.dispose();
      rtB.dispose();
      renderer?.dispose();
    });
  };

  const cleanupFns: Array<() => void> = [];
  void boot();

  const onUnload = () => cleanupFns.forEach((fn) => fn());
  window.addEventListener('beforeunload', onUnload);

  return () => {
    disposed = true;
    window.removeEventListener('beforeunload', onUnload);
    cleanupFns.forEach((fn) => fn());
  };
}
