/* ===== SoftAurora · 原生 WebGL 移植（着色器源自 React Bits） =====
   window.SoftAuroraInit(container, opts) → true/false */
window.SoftAuroraInit = function (container, opts) {
  opts = opts || {};
  const o = {
    speed: opts.speed != null ? opts.speed : 0.6,
    scale: opts.scale != null ? opts.scale : 1.5,
    brightness: opts.brightness != null ? opts.brightness : 1.0,
    color1: opts.color1 || '#f7f7f7',
    color2: opts.color2 || '#e100ff',
    noiseFrequency: opts.noiseFrequency != null ? opts.noiseFrequency : 2.5,
    noiseAmplitude: opts.noiseAmplitude != null ? opts.noiseAmplitude : 1.0,
    bandHeight: opts.bandHeight != null ? opts.bandHeight : 0.5,
    bandSpread: opts.bandSpread != null ? opts.bandSpread : 1.0,
    octaveDecay: opts.octaveDecay != null ? opts.octaveDecay : 0.1,
    layerOffset: opts.layerOffset || 0,
    colorSpeed: opts.colorSpeed != null ? opts.colorSpeed : 1.0,
    enableMouseInteraction: opts.enableMouseInteraction !== false,
    mouseInfluence: opts.mouseInfluence != null ? opts.mouseInfluence : 0.25,
    lightMode: !!opts.lightMode
  };
  function hexToVec3(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
  }
  const VERT = "\nattribute vec2 uv;\nattribute vec2 position;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0, 1);\n}\n";
  const FRAG = "\nprecision highp float;\n\nuniform float uTime;\nuniform vec3 uResolution;\nuniform float uSpeed;\nuniform float uScale;\nuniform float uBrightness;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform float uNoiseFreq;\nuniform float uNoiseAmp;\nuniform float uBandHeight;\nuniform float uBandSpread;\nuniform float uOctaveDecay;\nuniform float uLayerOffset;\nuniform float uColorSpeed;\nuniform vec2 uMouse;\nuniform float uMouseInfluence;\nuniform bool uEnableMouse;\nuniform float uLightMode;\n\n#define TAU 6.28318\n\nvec3 gradientHash(vec3 p) {\n  p = vec3(\n    dot(p, vec3(127.1, 311.7, 234.6)),\n    dot(p, vec3(269.5, 183.3, 198.3)),\n    dot(p, vec3(169.5, 283.3, 156.9))\n  );\n  vec3 h = fract(sin(p) * 43758.5453123);\n  float phi = acos(2.0 * h.x - 1.0);\n  float theta = TAU * h.y;\n  return vec3(cos(theta) * sin(phi), sin(theta) * cos(phi), cos(phi));\n}\n\nfloat quinticSmooth(float t) {\n  float t2 = t * t;\n  float t3 = t * t2;\n  return 6.0 * t3 * t2 - 15.0 * t2 * t2 + 10.0 * t3;\n}\n\nvec3 cosineGradient(float t, vec3 a, vec3 b, vec3 c, vec3 d) {\n  return a + b * cos(TAU * (c * t + d));\n}\n\nfloat perlin3D(float amplitude, float frequency, float px, float py, float pz) {\n  float x = px * frequency;\n  float y = py * frequency;\n\n  float fx = floor(x); float fy = floor(y); float fz = floor(pz);\n  float cx = ceil(x);  float cy = ceil(y);  float cz = ceil(pz);\n\n  vec3 g000 = gradientHash(vec3(fx, fy, fz));\n  vec3 g100 = gradientHash(vec3(cx, fy, fz));\n  vec3 g010 = gradientHash(vec3(fx, cy, fz));\n  vec3 g110 = gradientHash(vec3(cx, cy, fz));\n  vec3 g001 = gradientHash(vec3(fx, fy, cz));\n  vec3 g101 = gradientHash(vec3(cx, fy, cz));\n  vec3 g011 = gradientHash(vec3(fx, cy, cz));\n  vec3 g111 = gradientHash(vec3(cx, cy, cz));\n\n  float d000 = dot(g000, vec3(x - fx, y - fy, pz - fz));\n  float d100 = dot(g100, vec3(x - cx, y - fy, pz - fz));\n  float d010 = dot(g010, vec3(x - fx, y - cy, pz - fz));\n  float d110 = dot(g110, vec3(x - cx, y - cy, pz - fz));\n  float d001 = dot(g001, vec3(x - fx, y - fy, pz - cz));\n  float d101 = dot(g101, vec3(x - cx, y - fy, pz - cz));\n  float d011 = dot(g011, vec3(x - fx, y - cy, pz - cz));\n  float d111 = dot(g111, vec3(x - cx, y - cy, pz - cz));\n\n  float sx = quinticSmooth(x - fx);\n  float sy = quinticSmooth(y - fy);\n  float sz = quinticSmooth(pz - fz);\n\n  float lx00 = mix(d000, d100, sx);\n  float lx10 = mix(d010, d110, sx);\n  float lx01 = mix(d001, d101, sx);\n  float lx11 = mix(d011, d111, sx);\n\n  float ly0 = mix(lx00, lx10, sy);\n  float ly1 = mix(lx01, lx11, sy);\n\n  return amplitude * mix(ly0, ly1, sz);\n}\n\nfloat auroraGlow(float t, vec2 shift) {\n  vec2 uv = gl_FragCoord.xy / uResolution.y;\n  uv += shift;\n\n  float noiseVal = 0.0;\n  float freq = uNoiseFreq;\n  float amp = uNoiseAmp;\n  vec2 samplePos = uv * uScale;\n\n  for (float i = 0.0; i < 3.0; i += 1.0) {\n    noiseVal += perlin3D(amp, freq, samplePos.x, samplePos.y, t);\n    amp *= uOctaveDecay;\n    freq *= 2.0;\n  }\n\n  float yBand = uv.y * 10.0 - uBandHeight * 10.0;\n  return 0.3 * max(exp(uBandSpread * (1.0 - 1.1 * abs(noiseVal + yBand))), 0.0);\n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / uResolution.xy;\n  float t = uSpeed * 0.4 * uTime;\n\n  vec2 shift = vec2(0.0);\n  if (uEnableMouse) {\n    shift = (uMouse - 0.5) * uMouseInfluence;\n  }\n\n  float glow1 = auroraGlow(t, shift);\n  float glow2 = auroraGlow(t + uLayerOffset, shift);\n  vec3 gradient1 = cosineGradient(uv.x + uTime * uSpeed * 0.2 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.3, 0.20, 0.20));\n  vec3 gradient2 = cosineGradient(uv.x + uTime * uSpeed * 0.1 * uColorSpeed, vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.5, 0.20, 0.25));\n\n  vec3 col = 0.99 * glow1 * gradient1 * uColor1;\n  col += 0.99 * glow2 * gradient2 * uColor2;\n\n  col *= uBrightness;\n  float alpha = clamp(length(col), 0.0, 1.0);\n  if (uLightMode > 0.5) {\n    float phase1 = dot(gradient1, vec3(0.299, 0.587, 0.114));\n    float phase2 = dot(gradient2, vec3(0.299, 0.587, 0.114));\n    float weight1 = pow(max(glow1 * (0.62 + 0.38 * phase1), 0.0), 1.35);\n    float weight2 = pow(max(glow2 * (0.62 + 0.38 * phase2), 0.0), 1.35);\n    float weightSum = max(weight1 + weight2, 0.0001);\n\n    vec3 chroma = (weight1 * uColor1 + weight2 * uColor2) / weightSum;\n    float neutral = min(chroma.r, min(chroma.g, chroma.b));\n    chroma = max(chroma - vec3(neutral * 0.78), vec3(0.0));\n    float peak = max(chroma.r, max(chroma.g, chroma.b));\n    chroma = pow(clamp(chroma / max(peak, 0.0001), 0.0, 1.0), vec3(1.08));\n\n    float ink = clamp((weight1 + weight2) * uBrightness * 1.55, 0.0, 0.82);\n    gl_FragColor = vec4(mix(vec3(1.0), chroma, ink), 1.0);\n  } else {\n    gl_FragColor = vec4(col, alpha);\n  }\n}\n";
    const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.appendChild(canvas);
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) { container.removeChild(canvas); return false; }
  gl.clearColor(0, 0, 0, 0);
  function compile(type, source) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return sh;
    console.error('SoftAurora shader:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs2 = compile(gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs2 || !program) { container.removeChild(canvas); return false; }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs2);
  gl.bindAttribLocation(program, 0, 'position');
  gl.bindAttribLocation(program, 1, 'uv');
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { container.removeChild(canvas); return false; }
  // 全屏三角形 + uv 属性
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 0, 3, -1, 2, 0, -1, 3, 0, 2]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8);
  const U = {};
  ['uTime','uResolution','uSpeed','uScale','uBrightness','uColor1','uColor2','uNoiseFreq','uNoiseAmp','uBandHeight','uBandSpread','uOctaveDecay','uLayerOffset','uColorSpeed','uMouse','uMouseInfluence','uEnableMouse','uLightMode'].forEach(n => { U[n] = gl.getUniformLocation(program, n); });
  gl.useProgram(program);
  gl.uniform1f(U.uSpeed, o.speed);
  gl.uniform1f(U.uScale, o.scale);
  gl.uniform1f(U.uBrightness, o.brightness);
  gl.uniform3fv(U.uColor1, hexToVec3(o.color1));
  gl.uniform3fv(U.uColor2, hexToVec3(o.color2));
  gl.uniform1f(U.uNoiseFreq, o.noiseFrequency);
  gl.uniform1f(U.uNoiseAmp, o.noiseAmplitude);
  gl.uniform1f(U.uBandHeight, o.bandHeight);
  gl.uniform1f(U.uBandSpread, o.bandSpread);
  gl.uniform1f(U.uOctaveDecay, o.octaveDecay);
  gl.uniform1f(U.uLayerOffset, o.layerOffset);
  gl.uniform1f(U.uColorSpeed, o.colorSpeed);
  gl.uniform1f(U.uMouseInfluence, o.mouseInfluence);
  gl.uniform1i(U.uEnableMouse, o.enableMouseInteraction ? 1 : 0);
  gl.uniform1f(U.uLightMode, o.lightMode ? 1 : 0);
  const mouse = [0.5, 0.5], target = [0.5, 0.5];
  let raf = 0, visible = true;
  function resize() {
    const w = Math.max(1, container.offsetWidth), h = Math.max(1, container.offsetHeight);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * ratio; canvas.height = h * ratio;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform3f(U.uResolution, canvas.width, canvas.height, canvas.width / canvas.height);
  }
  function frame(t) {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    gl.uniform1f(U.uTime, t * 0.001);
    if (o.enableMouseInteraction) {
      mouse[0] += 0.05 * (target[0] - mouse[0]);
      mouse[1] += 0.05 * (target[1] - mouse[1]);
    }
    gl.uniform2f(U.uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  if (o.enableMouseInteraction) {
    window.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1.0 - (e.clientY - r.top) / r.height;
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => { target[0] = 0.5; target[1] = 0.5; });
  }
  new ResizeObserver(resize).observe(container);
  new IntersectionObserver((es) => { visible = es.some(e => e.isIntersecting); }).observe(container);
  resize();
  raf = requestAnimationFrame(frame);
  return true;
};
